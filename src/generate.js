const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
var archiver = require('archiver');
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');
const questionSchema = require('./question_schema');
const answerSchema = require('./answer_schema');

function gatherInputFiles() {
  return fs.readdirSync(inputDir).map(file => {
    return file.replace('.xlsx', '');
  });
}

function createOutputDirectory() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log(`${outputDir} directory was created`);
  }
}

function removeOldOutputFiles() {
  console.log('Deleting existing output files');
  fs.readdirSync(outputDir).forEach(file => {
    fs.unlinkSync(path.join(outputDir, file));
  });
}

function writeJsonOutput(file, questions) {
  fs.writeFileSync(
    `${outputDir}/${file}.json`,
    JSON.stringify(questions),
    'utf-8'
  );
}

function zipOutput() {
  console.log('Zipping output files');
  var output = fs.createWriteStream(outputDir + '/cuestionarios.zip');
  var archive = archiver('zip');
  archive.pipe(output);
  archive.glob(`${outputDir}/*.json`);
  archive.finalize();
}

async function generateOutputFiles(inputFiles) {
  for (file of inputFiles) {
    console.log(`Generating file: ${file}\n`);

    let questionsData = await readXlsxFile(`${inputDir}/${file}.xlsx`, {
      schema: questionSchema
    });

    let answersData = await readXlsxFile(`${inputDir}/${file}.xlsx`, {
      schema: answerSchema,
      sheet: 2
    });

    let questionRows = questionsData.rows;
    let answerRows = answersData.rows;

    let questions = questionRows.map(question => {
      let answers = answerRows
        .filter(
          answer =>
            answer.noQuestion === question.noQuestion &&
            answer.comodin === question.comodin
        )
        .map(answer => {
          return {
            inciso: answer.inciso,
            option: answer.option,
            selected: answer.selected,
            next: answer.next,
            specify: answer.specify
          };
        });

      return {
        id: question.id,
        categoryId: question.categoryId,
        noQuestion: question.noQuestion,
        question: question.question,
        inciso: question.inciso,
        subquestion: question.subquestion,
        instructions: question.instructions,
        type: question.type,
        answers: answers
      };
    });

    writeJsonOutput(file, questions);
    console.log(`File: ${file} generated\n`);
  }
}

async function main() {
  const inputFiles = gatherInputFiles();
  createOutputDirectory();
  removeOldOutputFiles();
  await generateOutputFiles(inputFiles);
  zipOutput();
  console.log('Done!');
}

main();

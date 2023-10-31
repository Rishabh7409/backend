const AWS = require("aws-sdk");
const fs = require("fs");
const readExcelFile = require("read-excel-file/node");

exports.s3FileUpload = async (
  file,
  uploadFileDirPath,
  binaryData,
  binary = false
) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const newFileName = this.removeAlphabetInName(file);

    let fileName = `${uploadFileDirPath}/${file}`;
    let fileContent = binaryData;

    if (!binary) fileContent = fs.readFileSync(fileName);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: newFileName,
      Body: fileContent,
      ContentDisposition: `attachment; filename=${newFileName}`,
    };
    let data = await s3.upload(params).promise();
    if (!binary) fs.unlinkSync(fileName);
    return { status: 1, message: "successfully uploaded file", data: data };
  } catch (error) {
    console.log(error);
    return { status: 0, message: error };
  }
};

exports.getS3FileUpload = async () => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "emailList.xlsx",
    };
    let re = await s3.getObject(params).promise();
    if (re) {
      let fileDataArr = await readExcelFile(re.Body);
      let r = convertToJSON(fileDataArr);
      r = r.map((obj) => {
        return {
          name: obj.field1,
          phone: obj.field2,
          email: obj.field3,
          services: obj.field4,
          message: obj.field4,
        };
      });
      return r;
    } else {
      return "no";
    }
  } catch (error) {
    console.log(error);
    return { status: 0, message: error };
  }
};

exports.removeAlphabetInName = (name) => {
  return name.replace(/[^A-Za-z0-9_.-]/g, "");
};

function convertToJSON(array) {
  let jsonData = [];
  for (var i = 1, length = array.length; i < length; i++) {
    const row = array[i];

    if (row.filter((d) => d === null).length !== row.length) {
      var data = {};
      let emptyCol = 0;
      for (var x = 0; x < row.length; x++) {
        if (row[x] == null) emptyCol++;
        else break;
      }
      row.splice(0, emptyCol);
      for (var x = 0; x < row.length; x++) {
        data["field" + (x + 1)] = row[x];
      }
      jsonData.push(data);
    }
  }

  return jsonData;
}

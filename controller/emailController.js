const ExcelJS = require("exceljs");
const fs = require("fs");
const { s3FileUpload, getS3FileUpload } = require("../commenServices");
let uploadFileDirPath = `upload/export-excel`;
let fileName = `emailList.xlsx`;

exports.email = async (req, res) => {
  let r = await getS3FileUpload();
  return res.send(r);
};

exports.create = async (req, res) => {
  const { name, phone, email, services, message } = req.body;
  console.log({ name, phone, email, services, message });

  if (!fs.existsSync(uploadFileDirPath)) {
    fs.mkdirSync(uploadFileDirPath, { recursive: true });
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Email");
  let obj = { name, phone, email, services, message };

  worksheet.columns = Object.keys(obj).map((key) => {
    const header = key.replace(/([A-Z])/g, " $1").trim();
    return { header, key: key };
  });

  worksheet.addRow(obj);
  let r = await getS3FileUpload();
  if (r != "no" && r.length > 0) {
    r.map((o) => {
      worksheet.addRow(o);
    });
  }
  await workbook.xlsx.writeFile(`${uploadFileDirPath + "/" + fileName}`);
  let filePath = {
    fileName: uploadFileDirPath + "/" + fileName,
    status: 1,
    message: "file created",
  };
  if (filePath.status === 1) {
    let s3Result = await s3FileUpload(fileName, uploadFileDirPath);
    if (s3Result.status != 1) return s3Result;
    let fileLink = s3Result.data.Location;
    filePath.fileName = fileLink;
    return res.send("success");
  } else {
    return res.send(new Error("error in upload"));
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, phone, email, services, message } = req.body;
  console.log("put");
  return res.send("success");
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  return res.send("success");
};
// exports.emailSender = async (data) => {
//   try {
//     console.log("data.templateData",data)
//     let credential = {};
//     //if providor data not found then it,s run as default
//     // if (data && data.templateData)
//     //   credential = {
//     //     host: data.templateData.host,
//     //     port: parseInt(data.templateData.port),
//     //     secure: data.templateData.secure === "false" ? false : true, // true for 465, false for other ports
//     //     auth: {
//     //       user: data.templateData.user,
//     //       pass: data.templateData.pass,
//     //     },
//     //   };
//     // else
//       credential = {
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "media@cubicads.in", // generated ethereal user
//           pass: "CubicAds@2023", // generated ethereal password
//         },
//       };

//     let transporter = nodemailer.createTransport(credential);
//     await sendMail(data, transporter);
//   } catch (error) {
//     console.log(error);
//   }
// };

// async function sendMail(data, transporter) {
//    // message  for email
//   let message = {
//     from:  "media@cubicads.in",
//     cc: [],
//     to:"rishabhkurmi7409@gmail.com",
//     subject: "hello",
//     html: "",
//     references:  "",
//     "in-reply-to": "",
//   };
// // console.log("messagemessage",message)

//   // there we attachment
// //   if (data.attachment){
// //     if(Array.isArray(data.attachment) && data.attachment.length > 0){
// //       message.attachments = data.attachment
// //     } else{
// //       message.attachments = [
// //         {
// //           href: data.attachment,
// //         },
// //       ];
// //     }
// //   }
//   // sent mail
//   transporter.sendMail(message).catch((error) => console.error(error));
// }

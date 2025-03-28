import Exceljs from "exceljs";
import PDFDocument from "pdfkit-table";
// import "pdfkit-table";
import { AdvertModel } from "../models/advert.js";
import { UserModel } from "../models/user.js";
import {
  addAdvertValidator,
  updateAdvertImageValidator,
  updateAdvertValidator,
} from "../validators/adverts.js";

const { Workbook } = Exceljs;

export const addAdvert = async (req, res) => {
  const { error, value } = addAdvertValidator.validate({
    ...req.body,
    image: req.file?.filename,
  });
  if (error) {
    return res.status(422).json(error);
  }

  const result = await AdvertModel.create({ ...value, userId: req.auth.id });
  res.status(201).json({
    message: "Advert created successfully",
    data: result,
  });
};

export const getAllAdverts = async (req, res) => {
  let {
    filterType,
    filter,
    sort,
    order = "asc",
    page = 5,
    limit = 10,
  } = req.query;
  const query = {};

  if (filterType && filter) {
    if (filterType === "lte" || filterType === "gte") {
      const price = parseInt(filter, 10);
      if (!isNaN(price)) {
        query.price = { [filterType === "lte" ? "$lte" : "$gte"]: price };
      }
    } else if (filterType === "title") {
      query.title = { $regex: new RegExp(filter, "i") };
    } else if (filterType === "category") {
      query.category = { $regex: new RegExp(filter, "i") };
    }
  }

  // const seacrhQuery = { ...query, userId: req.user.id };

  const sorting = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};
  limit = parseInt(limit);

  // Count total adverts for the user
  const totalAdverts = await AdvertModel.countDocuments(query);
  const message =
    totalAdverts > 0
      ? `${totalAdverts} ${totalAdverts === 1 ? "advert" : "adverts"} found`
      : `No advert matches the filter value '${filter}'`;

  if (totalAdverts <= 0) {
    return res.json({
      success: true,
      message,
      page: 1,
      limit,
      totalPages: 0,
      totalAdverts: 0,
      data: [],
    });
  }

  const totalPages = Math.ceil(totalAdverts / limit);
  const currentPage = Math.min(page, totalPages);
  const skip = (currentPage - 1) * limit;

  // Get adverts with pagination and sorting options
  const adverts = await AdvertModel.find(query)
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    message,
    page: currentPage,
    limit,
    totalPages,
    totalAdverts,
    data: adverts,
  });
};

export const getVendorAdverts = async (req, res) => {
  let {
    filterType,
    filter,
    sort,
    order = "asc",
    page = 1,
    limit = 10,
  } = req.query;
  const query = { userId: req.auth.id };

  if (filterType && filter) {
    if (filterType === "lte" || filterType === "gte") {
      const price = parseInt(filter, 10);
      if (!isNaN(price)) {
        query.price = { [filterType === "lte" ? "$lte" : "$gte"]: price };
      }
    } else if (filterType === "title") {
      query.title = { $regex: new RegExp(filter, "i") };
    } else if (filterType === "category") {
      query.category = { $regex: new RegExp(filter, "i") };
    }
  }

  // const seacrhQuery = { ...query, userId: req.user.id };

  const sorting = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};
  limit = parseInt(limit);

  // Count total adverts for the user
  const totalAdverts = await AdvertModel.countDocuments(query);
  const message =
    totalAdverts > 0
      ? `${totalAdverts} ${totalAdverts === 1 ? "advert" : "adverts"} found`
      : `No advert matches the filter value '${filter}'`;

  if (totalAdverts <= 0) {
    return res.json({
      success: true,
      message,
      page: 1,
      limit,
      totalPages: 0,
      totalAdverts: 0,
      data: [],
    });
  }

  const totalPages = Math.ceil(totalAdverts / limit);
  const currentPage = Math.min(page, totalPages);
  const skip = (currentPage - 1) * limit;

  // Get adverts with pagination and sorting options
  const adverts = await AdvertModel.find(query)
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    message,
    page: currentPage,
    limit,
    totalPages,
    totalAdverts,
    data: adverts,
  });
};

export const getVendorAdvertById = async (req, res) => {
  const advertId = req.params.id;
  const advert = await AdvertModel.findOne({
    _id: advertId,
    userId: req.auth.id,
  });
  if (!advert) {
    return res.status(404).json({ error: "Advert not found" });
  }

  res.status(200).json(advert);
};

export const getAdvertById = async (req, res) => {
  const advertId = req.params.id;
  const advert = await AdvertModel.findById(advertId);
  if (!advert) {
    return res.status(404).json({ error: "Advert not found" });
  }

  res.status(200).json(advert);
};

export const updateVendorAdvert = async (req, res) => {
  const { error, value } = updateAdvertValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  const advert = await AdvertModel.findOne({
    _id: req.params.id,
    userId: req.auth.id,
  });

  if (!advert) {
    return res.status(404).json({ error: "Advert not found" });
  }

  if (advert.userId?.toString() !== req.auth.id) {
    return res.status(403).json({
      error: "You are not authorized to update this advert",
    });
  }

  const result = await AdvertModel.findByIdAndUpdate(advert.id, value, {
    new: true,
  });

  res.status(200).json({
    message: "Advert updated successfully",
    data: result,
  });
};

export const updateAdvertImage = async (req, res) => {
  const { error, value } = updateAdvertImageValidator.validate({
    image: req.file?.filename,
  });
  if (error) {
    return res.status(422).json(error);
  }

  const advert = await AdvertModel.findOne({
    _id: req.params.id,
    userId: req.auth.id,
  });
  if (!advert) {
    return res.status(404).json({ error: "Advert not found" });
  }

  if (advert.userId?.toString() !== req.auth.id) {
    return res.status(403).json({
      error: "You are not authorized to update this advert",
    });
  }

  const result = await AdvertModel.findByIdAndUpdate(advert.id, value, {
    new: true,
  });
  res.status(200).json({
    message: "Advert image updated successfully",
    data: result,
  });
};

export const deleteVendorAdvert = async (req, res) => {
  const advert = await AdvertModel.findOne({
    _id: req.params.id,
    userId: req.auth.id,
  });
  if (!advert) {
    return res.status(404).json({ error: "Advert not found" });
  }

  if (advert.userId?.toString() !== req.auth.id) {
    return res.status(403).json({
      error: "You are not authorized to delete this advert"
    });
  }

  await AdvertModel.findByIdAndDelete(advert.id);
  res.status(204).end();
};

// Export vendors' adverts data to excel
export const exportAdvertsToExcel = async (req, res) => {
  const user = await UserModel.findById(req.auth.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const adverts = await AdvertModel.find({ userId: user.id });

  const workBook = new Workbook();
  const workSheet = workBook.addWorksheet("advert");

  workSheet.columns = [
    { header: "ID", key: "id", width: 25 },
    { header: "Title", key: "title", width: 30 },
    { header: "Description", key: "description", width: 35 },
    { header: "Category", key: "category", width: 20 },
    { header: "Price", key: "price", width: 15 },
    { header: "Image", key: "image", width: 20 },
    { header: "Created Date", key: "createdAt", width: 20 },
  ];

  adverts.forEach((advert) => workSheet.addRow(advert));

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=advert.xlsx");

  await workBook.xlsx.write(res);

  res.end();
};

// export to pad
export const exportAdvertsToPDF = async (req, res) => {
  const user = await UserModel.findById(req.auth.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const adverts = await AdvertModel.find({ userId: user.id });

  const doc = new PDFDocument({ margin: 30, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=advert.pdf");

  doc.pipe(res);

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .text(`${user.name}'s Adverts Report`, { align: "center" })
  doc.fontSize(14)
    .font("Helvetica")
    .text(`As at ${new Date}`, { align: "center" }).moveDown(2);

  const table = {
    headers: [
      "ID",
      "Title",
      "Description",
      "Category",
      "Price (GHS)",
      "Image",
      "Created At",
    ],
    rows: adverts.map((advert) => [
      advert.id,
      advert.title,
      advert.description,
      advert.category,
      advert.price,
      advert.image,
      advert.createdAt,
    ]),
  };

  // Set table
  await doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
    prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
    columnSpacing:10
  });

  doc.end();
};

// future consideration
// flag advert by admin

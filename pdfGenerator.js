const pdfmake = require("pdfmake/build/pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");

class CertificadoPDFGenerator {
  constructor(data) {
    this.pdf = null;
    this._data = data;

    pdfMake.vfs = vfsFonts.pdfMake.vfs;

    this._fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf",
      },
    };
    pdfMake.fonts = this._fonts;

    this.pdfConfig = {
      pageSize: { width: 21.6 * 62, height: "auto" },
      pageMargins: [0.5 * 72, 0.3 * 72],
      permissions: {
        printing: "highResolution",
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true,
      },
      styles: {
        header: {
          fontSize: 15,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
          fillColor: "#0b9bda",
          color: "white",
          margin: [0, 2, 0, 0],
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 10,
        },
        bold: {
          bold: true,
          color: "black",
        },
        red: {
          color: "red",
          bold: true,
        },
      },
      defaultStyle: {
        fontSize: 10,
        color: "#444",
      },
    };
  }

  _getFormattedDateTime(hour = false) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    var dateNow = `${year}-${month}-${day}`;

    if (hour) {
      dateNow += ` ${hours}:${minutes}:${seconds}`;
    }
    return dateNow;
  }

  _generateRandomNumber(digits) {
    if (digits <= 0) {
      throw new Error("El número de cifras debe ser mayor a 0");
    }
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _putSpace(pdfType) {
    if (pdfType === "large") {
      return "\n";
    } else if (pdfType === "small") {
      return [{ text: "", colSpan: 5, margin: [0, 20, 0, 0] }, 2, 3, 4, 5, 6];
    }
  }

  _getHeadPDF(data, title, formatCode, date, version, page) {
    return {
      table: {
        widths: "*",
        body: [
          [
            // {
            //   image: path.join(
            //     __dirname,
            //     "../assets/img/gasinspection-logo.jpeg"
            //   ),
            //   colSpan: 1,
            //   rowSpan: 4,
            //   alignment: "center",
            //   width: 148,
            //   height: 105,
            // },
            {
              text: "",
              colSpan: 1,
              rowSpan: 4,
            },
            {
              text: "",
              colSpan: 1,
              rowSpan: 4,
            },
            {
              text: title,
              colSpan: 4,
              rowSpan: 3,
              margin: [0, 10, 0, 0],
              fontSize: 15,
              style: "header",
              alignment: "center",
            },
            3,
            4,
            5,
            { text: "Código Formato:", alignment: "right" },
            { text: formatCode, alignment: "center" },
          ],
          [
            1,
            2,
            3,
            4,
            5,
            6,
            { text: "Fecha:", alignment: "right" },
            { text: date, alignment: "center" },
          ],
          [
            1,
            2,
            3,
            4,
            5,
            6,
            { text: "Versión:", alignment: "right" },
            { text: version, alignment: "center" },
          ],
          [
            1,
            2,
            {
              colSpan: 3,
              text: "NÚMERO",
              alignment: "right",
            },
            4,
            5,
            {
              text: this._generateRandomNumber(4),
              alignment: "center",
              style: "red",
            },
            { text: "Página:", alignment: "right" },
            { text: page, alignment: "center" },
          ],
        ],
      },
    };
  }

  // 2 PAGES PDF
  // PAGE 1 PDF 1

  _getOneLineTablePDF1() {
    return {
      table: {
        widths: [50, "*", 80, "*", 60, "*", 30, "*", 99, "*", 100, "*"],
        body: [
          [
            { text: "FECHA", alignment: "center", style: "bold", fontSize: 10 },
            { text: "", alignment: "center", fontSize: 10 },
            {
              text: "HORA DE INICIO",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "center", fontSize: 10 },
            {
              text: "HORA FINAL",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "center", fontSize: 10 },
            { text: "OT", alignment: "center", style: "bold", fontSize: 10 },
            { text: "", alignment: "center", fontSize: 10 },
            {
              text: "TIPO DE INSPECCIÓN",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "center", fontSize: 10 },
            {
              text: "TIPO DE EDIFICACIÓN",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "center", fontSize: 10 },
          ],
        ],
      },
    };
  }

  _getFirst2ColTablesPDF1() {
    return {
      columns: [
        {
          width: "*",
          table: {
            heights: 15,
            widths: [75, 120, 55, 120],
            body: [
              [
                {
                  text: "1. INFORMACION ORGANISMO DE INSPECCIÓN ",
                  colSpan: 4,
                  alignment: "center",
                  style: "subheader",
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: "RAZÓN SOCIAL",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "GASINSPECTION SAS",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "NIT",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                { text: "800258258-2", alignment: "center", fontSize: 10 },
              ],
              [
                {
                  text: "DIRECCIÓN",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                { text: "KR 10 CL 10 - 10", alignment: "center", fontSize: 10 },
                {
                  text: "TELÉFONO",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                { text: "3252569", alignment: "center", fontSize: 10 },
              ],
              [
                {
                  text: "CORREO",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "info@gasinspection.net",
                  alignment: "center",
                  fontSize: 10,
                  colSpan: 3,
                },
                {},
                {},
              ],
            ],
          },
        },
        { width: 20, text: "" },
        {
          width: "66%",
          table: {
            heights: 15,
            widths: [115, 110, 70, "*", 52, 140],
            body: [
              [
                {
                  text: "2. INFORMACIÓN DEL CLIENTE Y PREDIO",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "NOMBRE/RAZÓN SOCIAL",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.client.name,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "CEDULA O NIT",
                  margin: [0, 0, 0, 0],
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.client.identification,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "CELULAR",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.client.cell,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "DISTRIBUIDOR",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.property.DistributorId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "DIRECCIÓN",
                  margin: [0, 0, 0, 0],
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.property.address,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "BARRIO",
                  margin: [0, 0, 0, 0],
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.property.district,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "DEPARTAMENTO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.property.DepartmentId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "MUNICIPIO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.property.CityId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "CONTRATO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.property.contract,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
            ],
          },
        },
      ],
    };
  }

  _getSec2ColTablesPDF1() {
    return {
      columns: [
        {
          widths: "*",
          table: {
            heights: 15,
            widths: [76, 170, 81, 42, "*"],
            body: [
              [
                {
                  text: "3. INFORME ANTERIOR (NUEVAS)",
                  colSpan: 4,
                  alignment: "center",
                  style: "subheader",
                },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
              ],
              [
                {
                  text: "ORGANISMO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.revision.organism",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "REVISIÓN PREVIA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                { text: "", alignment: "center", fontSize: 10 },
              ],
              [
                {
                  text: "No. DE INFORME",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.revision.numberReport,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "FECHA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.revision.date,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
            ],
          },
        },
        { width: 20, text: "" },
        {
          width: "66%",
          table: {
            heights: 15,
            widths: [46, "*", 115, "*", 90, "*"],
            body: [
              [
                {
                  text: "4. INFORMACION DE LA INSTALACIÓN",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
              ],
              [
                {
                  text: "ITEM",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.info.ItemToInspectedId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "TIPO DE INSTALACIÓN",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.info.InstallTypeId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "FECHA ÚLTIMA INS",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.info.date_last_inpection,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "TRAZADO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.info.layout,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "TIPO CENTRO MEDICIÓN",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.info.TypeCenterMeditionId",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "TIPO DE METARIAL",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.info.matetialType,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
            ],
          },
        },
      ],
    };
  }

  _getThi2ColTablesPDF1() {
    return {
      columns: [
        {
          width: "*",
          table: {
            heights: 15,
            widths: [72, 110, 90, 98],
            body: [
              [
                {
                  text: "5. DATOS EMPRESA INSTALADORA",
                  colSpan: 4,
                  alignment: "center",
                  style: "subheader",
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: "EMPRESA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.installers.CompanyId",
                  alignment: "center",
                  fontSize: 10,
                  colSpan: 3,
                },
                { text: "", alignment: "start", style: "bold", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                {
                  text: "SIC EMPRESA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.installers.sicCompany,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "NIT",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.installers.nit,
                  alignment: "center",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "INSTALADOR",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.installers.nameInstaller,
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "SIC INSTALADOR",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.installers.sic_number",
                  alignment: "center",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "CEDULA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.installers.identification",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "No. COMPETENCIA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.installers.competition_number",
                  alignment: "center",
                  fontSize: 10,
                },
              ],
            ],
          },
        },
        { width: 20, text: "" },
        {
          width: "66%",
          table: {
            heights: 15,
            widths: [70, 240, 80, 240, 40, "*"],
            body: [
              [
                {
                  text: "6. RED MATRIZ",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "ORGANISMO",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "this._data.webMatrix.CompanyId",
                  alignment: "start",
                  fontSize: 10,
                },
                {
                  text: "No DE INFORME",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.webMatrix.numberReport,
                  alignment: "start",
                  fontSize: 10,
                },
                {
                  text: "FECHA",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: this._data.webMatrix.date,
                  alignment: "start",
                  fontSize: 10,
                },
              ],
              [
                {
                  text: "OBSERVACIÓN",
                  alignment: "start",
                  style: "bold",
                  fontSize: 10,
                  rowSpan: 3,
                },
                {
                  text: this._data.webMatrix.observations,
                  alignment: "start",
                  fontSize: 10,
                  rowSpan: 3,
                  colSpan: 5,
                },
                { text: "", alignment: "start", style: "bold", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", style: "bold", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
            ],
          },
        },
      ],
    };
  }

  _getPlaneIscometricPDF1() {
    return {
      table: {
        widths: "*",
        heights: 20,
        body: [
          [
            { text: "7. PLANO", alignment: "center", style: "subheader" },
            { text: "8. ISOMÉTRICO", alignment: "center", style: "subheader" },
          ],
          ["ACÁ VA LA IMÁGEN", "ACÁ VA LA OTRA IMÁGEN"],
        ],
      },
    };
  }

  _getFou2ColTablePDF1() {
    const gasAppliances = this._data.gasAppliances || [];
    const enclosures = this._data.enclosures || [];

    // Generar las filas con datos de artefactos a gas
    const rowsWithData = gasAppliances.map((appliance, index) => {
      return [
        { text: (index + 1).toString(), alignment: "center", fontSize: 10 }, // Número de fila
        {
          text: appliance.burner_equipment.EquipmentType.name,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: appliance.burner_equipment.BurnerType.name,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: appliance.power_burner,
          alignment: "center",
          fontSize: 10,
        },
        { text: appliance.consumptionPoint, alignment: "center", fontSize: 10 },
        { text: appliance.status, alignment: "center", fontSize: 10 },
        {
          text: appliance.specialBurner || "",
          alignment: "center",
          fontSize: 10,
        },
        { text: appliance.ducted, alignment: "center", fontSize: 10 },
      ];
    });

    const totalRows = 9;
    const emptyRows = Array.from(
      { length: totalRows - rowsWithData.length },
      (_, index) => {
        return [
          {
            text: (gasAppliances.length + index + 1).toString(),
            alignment: "center",
            fontSize: 10,
          },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
        ];
      }
    );

    const tableBodyGas = [
      [
        {
          text: "9. ARTEFACTO A GAS",
          colSpan: 8,
          alignment: "center",
          style: "subheader",
          margin: [0, 5, 0, 5],
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        { text: "#\n ", alignment: "center", style: "bold", fontSize: 10 },
        {
          text: "ARTEFACTO A GAS",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        { text: "TIPO", alignment: "center", style: "bold", fontSize: 10 },
        {
          text: "POTENCIA (KW)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "PUNTO DE CONSUMO",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        { text: "ESTADO", alignment: "center", style: "bold", fontSize: 10 },
        {
          text: "CAL. ESPECIAL",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        { text: "CON DUCTO", alignment: "center", style: "bold", fontSize: 10 },
      ],
      ...rowsWithData,
      ...emptyRows,
    ];

    const rowsWithEnclosures = enclosures.map((enclosure, index) => {
      return [
        { text: enclosure.enclosure, alignment: "center", fontSize: 10 },
        {
          text: enclosure.height,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: enclosure.volume,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: (parseFloat(enclosure.volume) * 3.4).toFixed(2),
          alignment: "center",
          fontSize: 10,
        },
        { text: enclosure.group.toString(), alignment: "center", fontSize: 10 },
      ];
    });

    const emptyEnclosureRows = Array.from(
      { length: totalRows - rowsWithEnclosures.length },
      (_, index) => {
        return [
          { text: " ", alignment: "center", fontSize: 10 },
          { text: " ", alignment: "center", fontSize: 10 },
          { text: " ", alignment: "center", fontSize: 10 },
          { text: " ", alignment: "center", fontSize: 10 },
          { text: " ", alignment: "center", fontSize: 10 },
        ];
      }
    );

    const tableBodyEnclosures = [
      [
        {
          text: "10. VOLUMEN RECINTOS",
          colSpan: 5,
          alignment: "center",
          style: "subheader",
          margin: [0, 5, 0, 5],
        },
        {},
        {},
        {},
        {},
      ],
      [
        { text: "RECINTO", alignment: "center", style: "bold", fontSize: 10 },
        {
          text: "ALTO \n(Mts)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "VOL. \n(m3)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "POTENCIA PERMITIDA",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        { text: "GRUPO", alignment: "center", style: "bold", fontSize: 10 },
      ],
      ...rowsWithEnclosures,
      ...emptyEnclosureRows,
    ];

    return {
      columns: [
        {
          width: "60%",
          table: {
            widths: [15, "*", 130, 80, 100, 60, 70, 70],
            body: tableBodyGas,
          },
        },
        { width: 20, text: "" },
        {
          width: "38.6%",
          table: {
            widths: ["*", 40, 40, 60, 33],
            body: tableBodyEnclosures,
          },
        },
      ],
    };
  }

  _getFiv2ColTablePDF1() {
    const ventilations = this._data.ventilations || [];

    // Generar las filas con datos
    const rowsWithData = ventilations.map((ventilation, index) => {
      return [
        {
          text: ventilation.group.toString(),
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.area1.toString(),
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.totals ? ventilation.totals.toString() : "-",
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.ventilationMethod,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.ventilationType,
          alignment: "center",
          fontSize: 10,
        },
        { text: ventilation.openingType, alignment: "center", fontSize: 10 },
        { text: ventilation.geometry, alignment: "center", fontSize: 10 },
        {
          text: ventilation.height ? ventilation.height.toString() : "-",
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.area1 ? ventilation.area1.toString() : "-",
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.area2 ? ventilation.area2.toString() : "-",
          alignment: "center",
          fontSize: 10,
        },
        {
          text: ventilation.geometry2 ? ventilation.geometry2.toString() : "-",
          alignment: "center",
          fontSize: 10,
        },
      ];
    });

    const totalRows = 5; // Cambiar el número de filas a 5
    const emptyRows = Array.from(
      { length: totalRows - rowsWithData.length },
      (_, index) => {
        return [
          {
            text: (ventilations.length + index + 1).toString(),
            alignment: "center",
            fontSize: 10,
          },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
          { text: "", alignment: "center", fontSize: 10 },
        ];
      }
    );

    const tableBody = [
      [
        {
          text: "11. VENTILACIONES ",
          colSpan: 11,
          alignment: "center",
          style: "subheader",
          margin: [0, 5, 0, 5],
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        { text: "GRUPO", alignment: "center", style: "bold", fontSize: 10 },
        { text: "VOL (m3)", alignment: "center", style: "bold", fontSize: 10 },
        {
          text: "TOTAL POTENCIA PERMITIDA (kw)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "POTENCIA INSTALADA (kw)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "POTENCIA QUE REQUIERE VENTILACIÓN",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "METODO DE VENTILACIÓN",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "TIPO DE ABERTURA",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "DESCRIPCIÓN",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "AREA (cm2)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        {
          text: "POTENCIA LIBRE (Kw)",
          alignment: "center",
          style: "bold",
          fontSize: 10,
        },
        { text: "CUMPLE", alignment: "center", style: "bold", fontSize: 10 },
      ],
      ...rowsWithData,
      ...emptyRows,
    ];

    return {
      columns: [
        {
          width: "80%",
          table: {
            widths: [35, 45, 100, 55, 70, "*", "*", "*", 40, 60, 50],
            body: tableBody,
          },
        },
        { width: 20, text: "" },
        {
          width: "18.6%",
          table: {
            widths: "*",
            body: [
              [
                {
                  text: "12. EQUIPOS DE INSPECCIÓN",
                  colSpan: 2,
                  alignment: "center",
                  style: "subheader",
                  margin: [0, 5, 0, 5],
                },
                {},
              ],
              [
                {
                  text: "DESCRIPCIÓN\n\n ",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "SERIE",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
              ],
              [
                { text: "", alignment: "center", fontSize: 12 },
                { text: "", alignment: "center", fontSize: 12 },
              ],
            ],
          },
        },
      ],
    };
  }

  _getSix2ColTablePDF1() {
    return {
      columns: [
        {
          width: "30%",
          table: {
            widths: [45, "*", 85, 95],
            body: [
              [
                {
                  text: "13. CONSIDERACIONES LÍNEA MATRIZ",
                  colSpan: 4,
                  alignment: "center",
                  style: "subheader",
                  margin: [0, 5, 0, 5],
                },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
                { text: "", fontSize: 10 },
              ],
              [
                {
                  text: "TRAMO",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "MATERIAL",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "LONGITUD (mt)",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "DIÁMETRO (pulg)",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
              ],
              [
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
              ],
            ],
          },
        },
        { width: 20, text: "" },
        {
          width: "45%",
          table: {
            widths: [112, "*", 116, "*", 112, "*"],
            body: [
              [
                {
                  text: "14. PRUEBAS DE HERMETICIDAD Y PRESIÓN ",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                  margin: [0, 5, 0, 5],
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "PRUEBA DE HERMETICIDAD",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "PRUEBA CON MEDIDOR",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "PRESIÓN DE ENTREGA",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
              ],
              [
                { text: "Tiempo de ensayo", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "Tiempo prueba", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                {
                  text: "",
                  alignment: "start",
                  fontSize: 10,
                  rowSpan: 3,
                  colSpan: 2,
                },
                { text: "", alignment: "start", fontSize: 10, rowSpan: 3 },
              ],
              [
                { text: "Presión inicial", alignment: "start", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "Lect. Inicial", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                { text: "Presión final", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "Lect. Final", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                {
                  text: "16. DOCUMENTACIÓN RES. 90902 NUMERAL 4.1 (NUEVAS)",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                  margin: [0, 5, 0, 5],
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "EDIFICACIONES NUEVAS",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 4,
                },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                {
                  text: "EDIFICACIONES EXISTENTES",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                {
                  text: "Aprobación distribuidor",
                  alignment: "start",
                  fontSize: 10,
                },
                { text: "", alignment: "start", fontSize: 10 },
                {
                  text: "Disponibilidad del servicio ",
                  alignment: "start",
                  fontSize: 10,
                },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "Isométrico", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                {
                  text: "Certificado de materiales",
                  alignment: "start",
                  fontSize: 10,
                },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "Memoria técnica", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                {
                  text: "Certificado de materiales",
                  alignment: "start",
                  fontSize: 10,
                },
                { text: "", alignment: "start", fontSize: 10 },
              ],
              [
                { text: "Planos firmados", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
                { text: "Plano", alignment: "start", fontSize: 10 },
                { text: "", alignment: "start", fontSize: 10 },
              ],
            ],
          },
        },
        { width: 20, text: "" },
        {
          width: "20%",
          table: {
            widths: [54, "*", 50, 36, 36, 36],
            body: [
              [
                {
                  text: "15. PRUEBA DE CO",
                  colSpan: 6,
                  alignment: "center",
                  style: "subheader",
                  margin: [0, 5, 0, 5],
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                  rowSpan: 2,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "Ambiente",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "ARTEFACTOS ENCENDIDOS",
                  colSpan: 3,
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
                {
                  text: "",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                },
              ],
              [
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                {
                  text: "PUNTO",
                  style: "bold",
                  alignment: "center",
                  fontSize: 10,
                },
                {
                  text: "PUNTOS",
                  alignment: "center",
                  fontSize: 10,
                  colSpan: 3,
                  style: "bold",
                },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
              ],
              [
                {
                  text: "Recinto",
                  alignment: "center",
                  style: "bold",
                  fontSize: 10,
                  colSpan: 2,
                },
                { text: "", alignment: "center", fontSize: 10, style: "bold" },
                { text: "max", alignment: "center", fontSize: 10 },
                { text: "1", alignment: "center", fontSize: 10 },
                { text: "2", alignment: "center", fontSize: 10 },
                { text: "3", alignment: "center", fontSize: 10 },
              ],
              [
                { text: "", alignment: "center", fontSize: 10, colSpan: 2 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
                { text: "", alignment: "center", fontSize: 10 },
              ],
            ],
          },
        },
      ],
    };
  }

  // PAGE 2 PDF 1

  _getFrstTablePDF1p2() {
    return {
      table: {
        heights: 23,
        widths: "*",
        body: [
          [
            {
              text: "17. ASPECTOS SOBRE LA RESOLUCIÓN 41385 DE 07-12-2017",
              colSpan: 4,
              alignment: "center",
              style: "subheader",
            },
            {},
            {},
            {},
          ],
          [
            {
              text: "Existencia de vacio interno en la edificación ",
              alignment: "start",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "La edificación cuenta con escritura primigenia o licencia de construccion",
              alignment: "start",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "La edificación cuenta con escritura primigenia o licencia de construccion ",
              alignment: "start",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "Las condiciones de ventilación debe ser evaluada en periodos no superiores a (3) años",
              alignment: "start",
              style: "bold",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
        ],
      },
    };
  }

  _getSecTablePDF1p2() {
    return {
      table: {
        widths: "*",
        body: [
          [
            {
              text: "18. VACIOS INTERNOS DE LA EDIFICACIÓN",
              colSpan: 15,
              alignment: "center",
              style: "subheader",
              margin: [0, 5, 0, 5],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            { text: "#", alignment: "center", style: "bold", fontSize: 12 },
            {
              text: "Uso del vacío interno",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Número de pisos",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Tiene techado",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Cant. de artefactos tipo B2 o C",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Sumatoria de potencias",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Lado mayor (m)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Lado menor (m)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Área en planta (m2)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Ventilación (cm2)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Tipo de ventilación en la base",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Ancho ventilación (cm)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Alto ventilación, base (cm)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Área, base (cm2)",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
            {
              text: "Cumple",
              alignment: "center",
              style: "bold",
              fontSize: 10,
            },
          ],
          [
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "", alignment: "center", fontSize: 12 },
          ],
        ],
      },
    };
  }

  _getThrTablePDF1p2() {
    return {
      table: {
        heights: 23,
        widths: "*",
        body: [
          [
            {
              text: "17. ASPECTOS SOBRE LA RESOLUCIÓN 41385 DE 07-12-2017",
              colSpan: 4,
              alignment: "center",
              style: "subheader",
            },
            {},
            {},
            {},
          ],
          [
            {
              text: "17.1 Hermeticidad",
              alignment: "center",
              style: "bold",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.6 Ventilación",
              alignment: "center",
              style: "bold",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.1.1. Manómetro no registra diferencia de lecturas.(Nuevas).",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.6.1. Se satisfacen las condiciones de ventilación de la NTC 3631 segunda actualización.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.1.2. Caudalimetro no registra diferencia de lectura (existente).",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.6.2. Las condiciones de ventilación del recinto no está obstruida por el usuario.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.1.3. Concentración de gas no mayor a 0.0% en volumen.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7 Trazado",
              alignment: "center",
              style: "bold",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          // ----------------------------------------------------------------
          [
            {
              text: "17.2 Existencia y operatividad de válvulas de corte",
              alignment: "center",
              style: "bold",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7.1. Mecanismo de control de sobrepresión del regulador no expulsa el gas al interior de la vivienda o recinto.",
              alignment: "start",
              fontSize: 10,
              rowSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 10, rowSpan: 2 },
          ],
          [
            {
              text: "18.2.1. Existencia de válvula a la entrada del medidor",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.6.1. Se satisfacen las condiciones de ventilación de la NTC 3631 segunda actualización.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "18.2.2. Válvula de corte general controla totalmente el flujo de gas.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7.2. Instalación cuenta con protecciones a daños mecánicos y proteccion pasiva en los tramos de tubería a la vista.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "18.2.3. Existencia de válvula que controla el paso de gas para un artefacto.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7.3. Tubería no encamisada con uniones roscadas no pasa por dormitorios o baños.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "18.2.4. Válvula que controla el flujo de gas para un artefacto suspende totalmente el paso de gas.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7.4. Dispositivos de anclaje sujetan de manera segura el soporte de la instalación, cuando esta se encuentra a la vista.",
              alignment: "start",
              fontSize: 10,
              rowSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 10, rowSpan: 2 },
          ],
          [
            {
              text: "18.2.5 Válvula asociada al artefacto se encuentra de fácil acceso.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "18.2.6. Existencia de maneral que controla el paso de gas a la instalación interna o a un artefacto.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.7.5. Instalación interna no se encuentra alojada por conductos de aire, chimeneas, fosos de ascensor, sótanos y similares sin ventilación, conductos para instalaciones eléctricas y de basura en los cuales un escape se pueda esparcir por el edificio o áreas donde hallan transformadores eléctricos o recipientes de combustibles líquidos o sustancias cuyos vapores o ellas mismas sean corrosivas",
              alignment: "start",
              fontSize: 10,
              rowSpan: 4,
            },
            { text: "", alignment: "start", fontSize: 10, rowSpan: 4 },
          ],
          [
            {
              text: "18.2.7. Existencia de la válvula de corte general que controla el paso de gas a toda la instalación.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.3 Ubicación de los artefactos a gas",
              alignment: "center",
              style: "bold",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.3.1. Inexistencia de artefactos eléctricos convertidos a gas.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.3.2. Potencia instalada no supera la considerada en el diseño (Instalaciones nuevas). ",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.8 Medición de monóxido de carbono",
              alignment: "center",
              fontSize: 10,
              colSpan: 2,
              style: "bold",
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.3.3. Inexitencia de artefactos a gas de circuito abierto ubicados dormitorios, baño o ducha o en compartimentos tales como armarios, closets ubicados en el interior de la vivenda.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.8.1 Existencia de ductos de evacuación o extracción de los productos de la combustión en aquellos artefacto a gas que así lo requieran.",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.4 Requisitos de instalación ",
              alignment: "center",
              fontSize: 10,
              style: "bold",
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.8.2. Concentración de monóxido en recintos donde esten instalados artefacto a gas encendidos a su máxima potencia no mayor a 50 ppm en volumen. ",
              alignment: "start",
              fontSize: 10,
              rowSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 10, rowSpan: 2 },
          ],
          [
            {
              text: "17.4.1. Calentadores especiales (Res. 0936 de 2008)(Existente o nuevas)",
              alignment: "center",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
          [
            {
              text: "17.5 Materiales",
              alignment: "center",
              fontSize: 10,
              style: "bold",
              colSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "17.8.3. Concentración de monóxido en recintos donde estén instalados artefacto a gas encendidos a su máxima potencia menor a 15 ppm en volumen.",
              alignment: "start",
              fontSize: 10,
              rowSpan: 2,
            },
            { text: "", alignment: "start", fontSize: 10, rowSpan: 2 },
          ],
          [
            {
              text: "17.5.1. Materiales cumplen con lo dispuesto en la NTC 2505 4ta actualización.",
              alignment: "center",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
            {
              text: "",
              alignment: "start",
              fontSize: 10,
            },
            { text: "", alignment: "start", fontSize: 12 },
          ],
        ],
      },
    };
  }

  _getFouTablePDF1p2() {
    return {
      table: {
        widths: "*",
        body: [
          [
            {
              text: "20. OBSERVACIONES",
              alignment: "center",
              style: "subheader",
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: "",
              alignment: "left",
              fontSize: 10,
              margin: [5, 5, 5, 5],
            },
          ],
        ],
      },
    };
  }

  _getFivTablePDF1p2() {
    return {
      table: {
        widths: "*",
        body: [
          [
            {
              text: "21. VARIOS",
              colSpan: 4,
              alignment: "center",
              style: "subheader",
            },
            {},
            {},
            {},
          ],
          [
            {
              text: "Se brinda información al usuario sobre la existencia de dispositivos de CO cuando la potencia excede los 4,2",
              alignment: "left",
              fontSize: 10,
              style: "bold",
            },
            { text: "", alignment: "center", fontSize: 12 },
            {
              text: "Kw ¿Se instaló sticker de revisión?",
              alignment: "center",
              fontSize: 10,
              style: "bold",
            },
            { text: "", alignment: "center", fontSize: 12 },
          ],
        ],
      },
    };
  }

  _getSevTablePDF1p2() {
    return {
      table: {
        widths: "*",
        body: [
          [
            {
              text: "22. RESULTADO DE INSPECCIÓN",
              colSpan: 6,
              alignment: "center",
              style: "subheader",
            },
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: "INSTALACIÓN CONFORME",
              alignment: "left",
              fontSize: 10,
              style: "bold",
            },
            { text: "", alignment: "center", fontSize: 12 },
            {
              text: "CON DEFECTOS CRÍTICOS",
              alignment: "center",
              fontSize: 10,
              style: "bold",
            },
            { text: "", alignment: "center", fontSize: 12 },
            {
              text: "CON DEFECTOS NO CRÍTICOS",
              alignment: "center",
              fontSize: 10,
              style: "bold",
            },
            { text: "", alignment: "center", fontSize: 12 },
          ],
        ],
      },
    };
  }

  _getEigTablePDF1p2() {
    return {
      table: {
        widths: ["*", "*", "*", "*"], // Cuatro columnas con anchos iguales
        body: [
          [
            {
              text: "23. INFORMACIÓN DEL INSPECTOR",
              colSpan: 2,
              alignment: "center",
              style: "subheader",
              margin: [0, 5, 0, 5],
            },
            {},
            {
              text: "24. INFORMACIÓN DE QUIEN ATIENDE LA INSPECCIÓN",
              colSpan: 2,
              alignment: "center",
              style: "subheader",
              margin: [0, 5, 0, 5],
            },
            {},
          ],
          // Fila vacía para espacio en blanco
          [
            { text: "", colSpan: 2, rowSpan: 2, margin: [0, 15, 0, 15] },
            {},
            { text: "", colSpan: 2, rowSpan: 2, margin: [0, 15, 0, 15] },
            {},
          ],
          // Segunda fila vacía para espacio en blanco
          [{ text: "", colSpan: 2 }, {}, { text: "", colSpan: 2 }, {}],
          // Fila para las firmas
          [
            { text: "Firma", alignment: "center", fontSize: 10, colSpan: 2 },
            { text: "", alignment: "center", fontSize: 12 },
            { text: "Firma", alignment: "center", fontSize: 10, colSpan: 2 },
            { text: "", alignment: "center", fontSize: 12 },
          ],
          // Fila para Nombre completo y otros campos
          [
            {
              text: "Nombre completo:",
              alignment: "left",
              fontSize: 10,
              colSpan: 2,
            },
            { text: "", alignment: "left", fontSize: 12 },
            { text: "Nombre completo:", alignment: "left", fontSize: 12 },
            { text: "", alignment: "left", fontSize: 12 },
          ],
          // Fila para Código certificado, Expedidor, Cedula, Vínculo
          [
            { text: "Código certificado:", alignment: "left", fontSize: 12 },
            { text: "Expedidor por:", alignment: "left", fontSize: 12 },
            { text: "Cedula:", alignment: "left", fontSize: 12 },
            { text: "Vínculo:", alignment: "left", fontSize: 12 },
          ],
        ],
      },
    };
  }

  // SMALL PDF
  _mainTableSmallPDF(body = []) {
    return {
      table: {
        widths: "*",
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        body: body,
      },
    };
  }

  _headerSmallPDF() {
    return [
      {
        colSpan: 5,
        table: {
          widths: "*",
          body: [
            [
              {
                image: "assets/img/gasinspection-logo.jpeg",
                colSpan: 1,
                rowSpan: 4,
                alignment: "center",
                width: 148,
                height: 105,
              },
              {
                text: "",
                colSpan: 1,
                rowSpan: 4,
              },
              {
                text: "ANEXO INFORME DE EVALUACIÓN DE LA CONFORMIDAD REDES INTERNAS PARA SUMINISTRO",
                colSpan: 4,
                rowSpan: 3,
                margin: [0, 10, 0, 0],
                style: "header",
                alignment: "center",
              },
              3,
              4,
              5,
              { text: "Código Formato:", alignment: "right" },
              { text: "CT-020", alignment: "center" },
            ],
            [
              1,
              2,
              3,
              4,
              5,
              6,
              { text: "Fecha:", alignment: "right" },
              { text: "", alignment: "center" },
            ],
            [
              1,
              2,
              3,
              4,
              5,
              6,
              { text: "Versión:", alignment: "right" },
              { text: "", alignment: "center" },
            ],
            [
              1,
              2,
              {
                colSpan: 3,
                text: "NÚMERO",
                alignment: "right",
              },
              4,
              5,
              { text: "1111", alignment: "center", style: "red" },
              { text: "Página:", alignment: "right" },
              { text: "1 de 2", alignment: "center" },
            ],
          ],
        },
      },
      2,
      3,
      4,
      5,
      { text: "", rowSpan: 9 },
    ];
  }

  _generaInfoSmallPDF() {
    return [
      {
        colSpan: 5,
        table: {
          widths: "*",
          body: [
            [
              {
                text: "INFORMACIÓN GENERAL",
                colSpan: 4,
                alignment: "center",
                style: "subheader",
              },
              "2",
              "3",
              "4",
            ],
            [
              { text: "Fecha", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Distribuidor", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              { text: "Contrato", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Departamento", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              { text: "Municipio", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Dirección", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              {
                text: "Tipo de trabajo",
                alignment: "start",
                style: "bold",
              },
              { text: "", alignment: "start", fontSize: 12 },
              {
                text: "Orden de trabajo",
                alignment: "start",
                style: "bold",
              },
              { text: "", alignment: "start", fontSize: 12 },
            ],
          ],
        },
      },
      2,
      3,
      4,
      5,
      6,
    ];
  }

  _getObservationsSmallPDF() {
    return [
      {
        colSpan: 5,
        table: {
          widths: "*",
          body: [
            [
              {
                text: "INFORMACIÓN GENERAL",
                colSpan: 4,
                alignment: "center",
                style: "subheader",
              },
              "2",
              "3",
              "4",
            ],
            [
              { text: "Fecha", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Distribuidor", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              { text: "Contrato", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Departamento", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              { text: "Municipio", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
              { text: "Dirección", alignment: "start", style: "bold" },
              { text: "", alignment: "start", fontSize: 12 },
            ],
            [
              {
                text: "Tipo de trabajo",
                alignment: "start",
                style: "bold",
              },
              { text: "", alignment: "start", fontSize: 12 },
              {
                text: "Orden de trabajo",
                alignment: "start",
                style: "bold",
              },
              { text: "", alignment: "start", fontSize: 12 },
            ],
          ],
        },
      },
      2,
      3,
      4,
      5,
      6,
    ];
  }

  _signResultsSmallPDF() {
    return [
      {
        widths: "*",
        margin: [0, 60, 0, 0],
        colSpan: 5,
        columns: [
          {
            layout: "headerLineOnly",
            table: {
              widths: [200, 200],
              headerRows: 1,
              body: [
                [
                  {
                    text: "",
                    colSpan: 2,
                    alignment: "center",
                    width: 300,
                    height: 100,
                    margin: [0, 77, 0, 0],
                  },
                  "2",
                ],
                [
                  {
                    text: "Firma",
                    colSpan: 2,
                    alignment: "center",
                    style: "bold",
                  },
                  "3",
                ],
                [
                  {
                    text: "",
                    colSpan: 2,
                    alignment: "center",
                    width: 300,
                    height: 150,
                  },
                  "2",
                ],
              ],
            },
          },
          {
            layout: "",
            table: {
              widths: ["*", "auto", "auto"],
              headerRows: 1,
              body: [
                [
                  {
                    text: "RESULTADOS",
                    style: "subheader",
                    alignment: "center",
                    borderColor: "#69a2cf",
                  },
                  {
                    text: "SI",
                    style: "subheader",
                    alignment: "center",
                    borderColor: "#69a2cf",
                  },
                  {
                    text: "NO",
                    style: "subheader",
                    alignment: "center",
                    borderColor: "#69a2cf",
                  },
                ],
                [
                  { text: "INSTALACIÓN CONFORME", alignment: "start" },
                  { text: "", alignment: "center" },
                  { text: "", alignment: "center" },
                ],
                [
                  { text: "CON DEFECTOS CRÍTICOS", alignment: "start" },
                  { text: "", alignment: "center" },
                  { text: "", alignment: "center" },
                ],
                [
                  {
                    text: "CON DEFECTOS NO CRÍTICOS",
                    alignment: "start",
                  },
                  { text: "", alignment: "center" },
                  { text: "", alignment: "center" },
                ],
              ],
            },
          },
        ],
      },
      2,
      3,
      4,
      5,
      6,
    ];
  }

  _nameSectionSmallPDF() {
    return [{ text: "Nombre:", style: "bold", colSpan: 5 }, 2, 3, 4, 5, 6];
  }

  _footSmalPDF() {
    return [
      {
        colSpan: 5,
        table: {
          widths: "*",
          heights: 20,
          body: [
            [
              {
                text: "Con la firma de este documento, el usuario autoriza el envío del informe completo de inspección al correo electrónico o al número de WhatsApp suministrado. En caso de no recibir el correo en un plazo de 24 horas, podrá solicitarlo enviando un mensaje a info@gasinspection.net o contactando al número de WhatsApp 3043223325.",
                alignment: "start",
                style: "subheader",
              },
            ],
          ],
        },
      },
      2,
      3,
      4,
      5,
      6,
    ];
  }

  _buildSmallPDF() {
    let content = [];
    let bodyMainTable = [
      this._headerSmallPDF(this._data),
      this._putSpace("small"),
      this._generaInfoSmallPDF(this._data),
      this._putSpace("small"),
      this._getObservationsSmallPDF(this._data),
      this._putSpace("small"),
      this._signResultsSmallPDF(this._data),
      this._nameSectionSmallPDF(this._data),
      this._footSmalPDF(this._data),
    ];
    let mainTable = this._mainTableSmallPDF(bodyMainTable);

    content.push(mainTable);
    // console.log(JSON.stringify(content));

    let pdfObject = {
      ...this.pdfConfig,
      content,
    };

    return pdfObject;
  }

  _buildLargePDF() {
    let content = [];
    content.push(
      this._getHeadPDF(
        this._data,
        "INFORME DE EVALUACIÓN DE LA CONFORMIDAD REDES INTERNA PARA SUMINISTRO DE GAS COMBUSTIBLE",
        "CT-020",
        "22/03/2024",
        "1",
        "1 de 2"
      )
    );
    content.push(this._putSpace("large"));
    content.push(this._getOneLineTablePDF1());
    content.push(this._putSpace("large"));
    content.push(this._getFirst2ColTablesPDF1());
    content.push(this._putSpace("large"));
    content.push(this._getSec2ColTablesPDF1());
    content.push(this._putSpace("large"));
    content.push(this._getThi2ColTablesPDF1());
    content.push(this._putSpace("large"));
    content.push(this._getPlaneIscometricPDF1());
    content.push(this._putSpace("large"));
    content.push(this._getFou2ColTablePDF1(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getFiv2ColTablePDF1(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getSix2ColTablePDF1(this._data));

    // 2 Page
    content.push({ text: "", pageBreak: "before" });

    content.push(
      this._getHeadPDF(
        this._data,
        "INFORME DE EVALUACIÓN DE LA CONFORMIDAD REDES INTERNA PARA SUMINISTRO DE GAS COMBUSTIBLE",
        "CT-020",
        "22/03/2024",
        "1",
        "2 de 2"
      )
    );
    content.push(this._putSpace("large"));
    content.push(this._getFrstTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getSecTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getThrTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getFouTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getFivTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getSevTablePDF1p2(this._data));
    content.push(this._putSpace("large"));
    content.push(this._getEigTablePDF1p2(this._data));

    // console.log(JSON.stringify(content));

    return {
      ...this.pdfConfig,
      content,
    };
  }

  generatePDF(type) {
    let docDefinition;
    if (type === "large") {
      docDefinition = this._buildLargePDF();
    } else if (type === "small") {
      docDefinition = this._buildSmallPDF();
    } else {
      throw new Error("Tipo de PDF no válido");
    }

    this.pdf = pdfmake.createPdf(docDefinition);
  }

  getBufferPDF(callback) {
    this.pdf.getBuffer((buffer) => {
      callback(buffer);
    });
  }
}

module.exports = CertificadoPDFGenerator;

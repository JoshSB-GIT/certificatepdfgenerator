const fs = require("fs");
const path = require("path");
const CertificadoPDFGenerator = require("./pdfGenerator");

// Ejemplo de datos para el PDF
const data = {
  InstallTypeId: 6,
  WorkTypeId: 4,
  groupsExists: [1],
  groupsFilters: [1],
  totals: [
    {
      group: 1,
      power: 26.4,
      volume: 27,
      power_free: 7.94,
      required_ventilation: true,
    },
  ],
  client: {
    DocumentTypeId: 1,
    identification: "1001947812",
    name: "JOSEPH",
    lastname: "SIERRA BELOÑO",
    email: "P3ND3J0@P3ND3J0.COM",
    cell: "3135579972",
    ClientId: 23,
  },
  property: {
    CityId: 98,
    DepartmentId: 1,
    district: "LA ESPERANZA",
    address: "KR 13B VIA 11A 19 CASA DE DOS PISOS CON PISCINA Y JARDÍN",
    mainVia: "KR",
    viaNumber: "13B",
    crossVia: "VIA",
    crossViaNumber: "11A",
    houseNumber: "19",
    complement: "CASA DE DOS PISOS CON PISCINA Y JARDÍN",
    DistributorId: 1,
    contract: "CONTRATO1",
    invoice: {
      provider: "",
      route: "",
    },
  },
  info: {
    ItemToInspectedId: 1,
    InstallTypeId: 1,
    TypeCenterMeditionId: 1,
    pic_trazado: {
      provider: "",
      route: "",
    },
    date_last_inpection: "2024-10-21",
    layout: "A LA VISTA",
    matetialType: "PE/AL/PE",
  },
  revision: {
    priorReview: "si",
    date: "2024-10-22",
    numberReport: "INFO-12 ",
    organism: 37,
  },
  installers: {
    CompanyId: 58,
    nit: "12345678-3",
    sicCompany: "123456",
    InstallerId: 4,
    indentInstaller: "224578778955",
    nameInstaller: "LUIS FONTALVO SANJUAN",
  },
  approval: {
    approvalDistributor: "SI",
    networkAvailability: "N.A.",
    design: "SI",
    technicalMemory: "N.A.",
    signedPlans: "SI",
    technicalMemoryFile: {
      provider: "",
      route: "",
    },
    materialCertificate: "N.A.",
    pipeLabelPhoto: {
      provider: "",
      route: "",
    },
    pipeCertificatePhoto: {
      provider: "",
      route: "",
    },
    accessoryCertificatePhoto: {
      provider: "",
      route: "",
    },
  },
  webMatrix: {
    CompanyId: 1,
    numberReport: "NUMERODEINFORMEXD1",
    date: "2024-10-21",
    observations: "OK",
  },
  lineMatrix: [
    {
      EquivalentLengthId: 8,
      equivalentsLenght: {
        id: 8,
        internal_measurement: "13.84",
        elbow: "0.42",
        tee: "0.830000",
        valve: "0.040000",
        c: "1.65",
        Diametre: {
          name: "1/2'",
          description: "1/2",
        },
        Pipe: {
          name: "COBRE",
        },
      },
      initial_tranche: "A",
      final_tranche: "B",
      pipe_select: 3,
      pipe_length: 23,
    },
  ],
  planeIsometric: {
    plans: {
      provider: "",
      route: "",
    },
    isometric: {
      provider: "",
      route: "",
    },
    plansDraw: {
      provider: "",
      route: "",
    },
  },
  gasAppliances: [
    {
      type: 1,
      specialBurner: "SI",
      qty_burner: 4,
      power_burner: 6.6,
      power: 26.4,
      consumptionPoint: "TAPONADO",
      status: "INSTALADO",
      ducted: "SI",
      picture: {
        provider: "",
        route: "",
      },
      picture_point: {
        provider: "",
        route: "",
      },
      picture_valve: {
        provider: "",
        route: "",
      },
      RelBurnerEquipmentId: 114,
      burner_equipment: {
        id: 114,
        EquipmentType: {
          name: "ESTUFA RESIDENCIAL",
        },
        BurnerType: {
          name: "DE 4 Q MEDIANOS",
          power: "6.60",
        },
      },
    },
  ],
  enclosures: [
    {
      EnclosureTypeId: 1,
      geometry: "CUADRADA",
      width: 3,
      length: 3,
      height: 3,
      diameter: "",
      base: "",
      group: 1,
      appliances: [
        {
          id: 0,
          EquipmentType: "ESTUFA RESIDENCIAL",
          BurnerType: "DE 4 Q MEDIANOS",
          qty_burner: 4,
          power: 26.4,
          power_burner: 6.6,
          consumptionPoint: "TAPONADO",
          status: "INSTALADO",
          ducted: "SI",
          picture: {
            provider: "",
            route: "",
          },
          picture_point: {
            provider: "",
            route: "",
          },
          picture_valve: {
            provider: "",
            route: "",
          },
          RelBurnerEquipmentId: 114,
        },
      ],
      area: 9,
      enclosure: "COCINA",
      volume: 27,
      GeometriesId: 1,
    },
  ],
  ventilations: [
    {
      EnclosureVentilationId: 0,
      ventilationType: "EXTERIOR",
      openingType: "UNICA",
      ventilationMethod: "METODO 2 (ABERTURA PERMANENTE)",
      geometry: "CUADRADA",
      diameter: "",
      area: "",
      width: 33,
      height: 33,
      base: "",
      geometry2: "",
      area2: 0,
      diameter2: "",
      width2: "",
      height2: "",
      base2: "",
      ventilationTypeFile: {
        provider: "",
        route: "",
      },
      groupsFilters: "",
      totals: "",
      area1: 1089,
      group: 1,
      enclosure: "COCINA",
    },
  ],
  testPressureGauge: {
    TimeId: 1,
    initialPressure: 33,
    finalPressure: 33,
    initialPhoto: {
      provider: "",
      route: "",
    },
    finalPhoto: {
      provider: "",
      route: "",
    },
  },
  testMeter: {
    testDuration: 13,
    initialReading: 23,
    finalReading: 33,
    initialPhoto: {
      provider: "",
      route: "",
    },
    finalPhoto: {
      provider: "",
      route: "",
    },
  },
  testDeliveryPressure: {
    deliveryPressure: 33,
    deliveryPhoto: {
      provider: "",
      route: "",
    },
  },
  testLeakDetector: {
    internalMeasurementPhoto: {
      provider: "",
      route: "",
    },
    valvePhotos: [
      {
        valvePhotos: {
          provider: "",
          route: "",
        },
      },
    ],
  },
  testCO2Environment: [
    {
      group: 1,
      coConcentration: 44,
      concentrationPhoto: {
        provider: "",
        route: "",
      },
      groupsExists: "",
    },
  ],
  testCO2On: [
    {
      group: 1,
      point1: 3,
      point2: 3,
      point3: 3,
      photoPoint1: {
        provider: "",
        route: "",
      },
      photoPoint2: {
        provider: "",
        route: "",
      },
      photoPoint3: {
        provider: "",
        route: "",
      },
    },
  ],
  aspectsResolution: {
    internalVoid: "Si",
    constructionLicense: "Si",
    primaryDeedDate: "2024-10-21",
    ventilationConditions: "Si",
  },
  internalVoid: {
    internalUse: "VENTILACION",
    numberOfFloors: 3,
    hasRoof: "SI",
    numberOfB2orCDevices: 3,
    smallerSide: 3,
    largerSide: 3,
    ventilationCm2: 3,
    baseVentilationType: "BAJO PLATAFORMA",
    totalPower: 3,
    baseVentilationArea: 3,
  },
  gasRequirements: {
    manometer: "NO APLICA",
    flowmeter: "NO APLICA",
    gasConcentration: "NO APLICA",
    ventilationNTC: "NO APLICA",
    ventilationNTC2: "NO APLICA",
    valveInlet: "NO APLICA",
    valveCut: "NO APLICA",
    valveAssociated: "NO APLICA",
    valveControl: "NO APLICA",
    valveEasy: "NO APLICA",
    handleControl: "NO APLICA",
    valveCutGeneral: "NO APLICA",
    controlOverpressure: "NO APLICA",
    protectionDamage: "NO APLICA",
    unjacketedPipe: "NO APLICA",
    devicesAnchoring: "NO APLICA",
    internalInstallation: "NO APLICA",
    devicesElectrical: "NO APLICA",
    powerInstalled: "NO APLICA",
    devicesGas: "NO APLICA",
    heatersSpecial: "NO APLICA",
    pipelinesEvacuation: "NO APLICA",
    coConcentration50ppm: "NO APLICA",
    coConcentration15ppm: "NO APLICA",
    calenSpecialsEx: "NO APLICA",
    materialsComply: "NO APLICA",
    ntc3833: "NO APLICA",
    ntc3838: "NO APLICA",
    ntc2505: "NO APLICA",
    markAllTo: "NO APLICA",
  },
  observationSection: {
    observations: "SECCIÓN DE OBSERVACIONES XD 1",
    stickerInstalled: "SI",
    coDeviceInfo: "NO",
    temporaryReconnection: "SI",
    stickerPhoto: {
      provider: "",
      route: "",
    },
  },
  inspectionResult: {
    installationConform: "SI",
    criticalDefects: "NO",
    nonCriticalDefects: "SI",
  },
  artefacto: null,
};

// Crear una instancia del generador de PDF
const pdfGenerator = new CertificadoPDFGenerator(data);

// Generar el PDF
pdfGenerator.generatePDF("large");

// Obtener el buffer del PDF
pdfGenerator.getBufferPDF((buffer) => {
  // Obtener la fecha y hora actuales
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Formatear el nombre del archivo
  const fileName = `test-${year}_${month}_${day}_${hours}_${minutes}_${seconds}.pdf`;

  // Guardar el PDF en la misma ruta con el nombre formateado
  const outputPath = path.join(__dirname, "temp/" + fileName);
  fs.writeFileSync(outputPath, buffer);
  console.log("PDF generado y guardado en:", outputPath);
});

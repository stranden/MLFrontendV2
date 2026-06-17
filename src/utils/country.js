// src/utils/country.js

// Unified mapping for Alpha-2, Alpha-3, IOC and full country name
const countryCodeMapping = {
  AE: { alpha3: 'ARE', ioc: 'UAE', full: 'United Arab Emirates' },
  AG: { alpha3: 'ATG', ioc: 'ANT', full: 'Antigua and Barbuda' },
  AI: { alpha3: 'AIA', ioc: 'AIA', full: 'Anguilla' },
  AL: { alpha3: 'ALB', ioc: 'ALB', full: 'Albania' },
  AM: { alpha3: 'ARM', ioc: 'ARM', full: 'Armenia' },
  AO: { alpha3: 'AGO', ioc: 'ANG', full: 'Angola' },
  AR: { alpha3: 'ARG', ioc: 'ARG', full: 'Argentina' },
  AS: { alpha3: 'ASM', ioc: 'ASA', full: 'American Samoa' },
  AT: { alpha3: 'AUT', ioc: 'AUT', full: 'Austria' },
  AU: { alpha3: 'AUS', ioc: 'AUS', full: 'Australia' },
  AW: { alpha3: 'ABW', ioc: 'ARU', full: 'Aruba' },
  AX: { alpha3: 'ALA', ioc: 'ÅLAND', full: 'Åland Islands' },
  AZ: { alpha3: 'AZE', ioc: 'AZE', full: 'Azerbaijan' },
  BA: { alpha3: 'BIH', ioc: 'BIH', full: 'Bosnia and Herzegovina' },
  BB: { alpha3: 'BRB', ioc: 'BAR', full: 'Barbados' },
  BD: { alpha3: 'BGD', ioc: 'BAN', full: 'Bangladesh' },
  BE: { alpha3: 'BEL', ioc: 'BEL', full: 'Belgium' },
  BF: { alpha3: 'BFA', ioc: 'BUR', full: 'Burkina Faso' },
  BG: { alpha3: 'BGR', ioc: 'BUL', full: 'Bulgaria' },
  BH: { alpha3: 'BHR', ioc: 'BHR', full: 'Bahrain' },
  BI: { alpha3: 'BDI', ioc: 'BDI', full: 'Burundi' },
  BJ: { alpha3: 'BEN', ioc: 'BEN', full: 'Benin' },
  BL: { alpha3: 'BLM', ioc: 'BLM', full: 'Saint Barthélemy' },
  BM: { alpha3: 'BMU', ioc: 'BER', full: 'Bermuda' },
  BN: { alpha3: 'BRN', ioc: 'BRU', full: 'Brunei' },
  BO: { alpha3: 'BOL', ioc: 'BOL', full: 'Bolivia' },
  BQ: { alpha3: 'BES', ioc: 'BES', full: 'Caribbean Netherlands' },
  BR: { alpha3: 'BRA', ioc: 'BRA', full: 'Brazil' },
  BS: { alpha3: 'BHS', ioc: 'BAH', full: 'Bahamas' },
  BT: { alpha3: 'BTN', ioc: 'BTN', full: 'Bhutan' },
  BV: { alpha3: 'BVT', ioc: 'BVT', full: 'Bouvet Island' },
  BW: { alpha3: 'BWA', ioc: 'BOT', full: 'Botswana' },
  BY: { alpha3: 'BLR', ioc: 'BLR', full: 'Belarus' },
  BZ: { alpha3: 'BLZ', ioc: 'BLZ', full: 'Belize' },
  CA: { alpha3: 'CAN', ioc: 'CAN', full: 'Canada' },
  CC: { alpha3: 'CCK', ioc: 'CCK', full: 'Cocos (Keeling) Islands' },
  CD: { alpha3: 'COD', ioc: 'COD', full: 'Democratic Republic of the Congo' },
  CF: { alpha3: 'CAF', ioc: 'CAF', full: 'Central African Republic' },
  CG: { alpha3: 'COG', ioc: 'COG', full: 'Republic of the Congo' },
  CH: { alpha3: 'CHE', ioc: 'SUI', full: 'Switzerland' },
  CI: { alpha3: 'CIV', ioc: 'CIV', full: "Côte d’Ivoire" },
  CK: { alpha3: 'COK', ioc: 'COK', full: 'Cook Islands' },
  CL: { alpha3: 'CHL', ioc: 'CHI', full: 'Chile' },
  CM: { alpha3: 'CMR', ioc: 'CMR', full: 'Cameroon' },
  CN: { alpha3: 'CHN', ioc: 'CHN', full: 'China' },
  CO: { alpha3: 'COL', ioc: 'COL', full: 'Colombia' },
  CR: { alpha3: 'CRI', ioc: 'CRC', full: 'Costa Rica' },
  CU: { alpha3: 'CUB', ioc: 'CUB', full: 'Cuba' },
  CV: { alpha3: 'CPV', ioc: 'CPV', full: 'Cape Verde' },
  CW: { alpha3: 'CUW', ioc: 'CUW', full: 'Curaçao' },
  CX: { alpha3: 'CXR', ioc: 'CXR', full: 'Christmas Island' },
  CY: { alpha3: 'CYP', ioc: 'CYP', full: 'Cyprus' },
  CZ: { alpha3: 'CZE', ioc: 'CZE', full: 'Czech Republic' },
  DE: { alpha3: 'DEU', ioc: 'GER', full: 'Germany' },
  DJ: { alpha3: 'DJI', ioc: 'DJI', full: 'Djibouti' },
  DK: { alpha3: 'DNK', ioc: 'DEN', full: 'Denmark' },
  DM: { alpha3: 'DMA', ioc: 'DMA', full: 'Dominica' },
  DO: { alpha3: 'DOM', ioc: 'DOM', full: 'Dominican Republic' },
  DZ: { alpha3: 'DZA', ioc: 'DZA', full: 'Algeria' },
  EC: { alpha3: 'ECU', ioc: 'ECU', full: 'Ecuador' },
  EE: { alpha3: 'EST', ioc: 'EST', full: 'Estonia' },
  EG: { alpha3: 'EGY', ioc: 'EGY', full: 'Egypt' },
  EH: { alpha3: 'ESH', ioc: 'ESH', full: 'Western Sahara' },
  ER: { alpha3: 'ERI', ioc: 'ERI', full: 'Eritrea' },
  ES: { alpha3: 'ESP', ioc: 'ESP', full: 'Spain' },
  ET: { alpha3: 'ETH', ioc: 'ETH', full: 'Ethiopia' },
  FI: { alpha3: 'FIN', ioc: 'FIN', full: 'Finland' },
  FJ: { alpha3: 'FJI', ioc: 'FIJ', full: 'Fiji' },
  FM: { alpha3: 'FSM', ioc: 'FSM', full: 'Micronesia' },
  FO: { alpha3: 'FRO', ioc: 'FRO', full: 'Faroe Islands' },
  FR: { alpha3: 'FRA', ioc: 'FRA', full: 'France' },
  GA: { alpha3: 'GAB', ioc: 'GAB', full: 'Gabon' },
  GB: { alpha3: 'GBR', ioc: 'GBR', full: 'United Kingdom' },
  GD: { alpha3: 'GRD', ioc: 'GRD', full: 'Grenada' },
  GE: { alpha3: 'GEO', ioc: 'GEO', full: 'Georgia' },
  GF: { alpha3: 'GUF', ioc: 'GUF', full: 'French Guiana' },
  GG: { alpha3: 'GGY', ioc: 'GGY', full: 'Guernsey' },
  GH: { alpha3: 'GHA', ioc: 'GHA', full: 'Ghana' },
  GI: { alpha3: 'GIB', ioc: 'GIB', full: 'Gibraltar' },
  GL: { alpha3: 'GRL', ioc: 'GRL', full: 'Greenland' },
  GM: { alpha3: 'GMB', ioc: 'GMB', full: 'Gambia' },
  GN: { alpha3: 'GIN', ioc: 'GIN', full: 'Guinea' },
  GP: { alpha3: 'GLP', ioc: 'GLP', full: 'Guadeloupe' },
  GQ: { alpha3: 'GNQ', ioc: 'GNQ', full: 'Equatorial Guinea' },
  GR: { alpha3: 'GRC', ioc: 'GRE', full: 'Greece' },
  GT: { alpha3: 'GTM', ioc: 'GUA', full: 'Guatemala' },
  GU: { alpha3: 'GUM', ioc: 'GUM', full: 'Guam' },
  GW: { alpha3: 'GNB', ioc: 'GNB', full: 'Guinea-Bissau' },
  GY: { alpha3: 'GUY', ioc: 'GUY', full: 'Guyana' },
  HK: { alpha3: 'HKG', ioc: 'HKG', full: 'Hong Kong' },
  HM: { alpha3: 'HMD', ioc: 'HMD', full: 'Heard Island and McDonald Islands' },
  HN: { alpha3: 'HND', ioc: 'HND', full: 'Honduras' },
  HR: { alpha3: 'HRV', ioc: 'CRO', full: 'Croatia' },
  HT: { alpha3: 'HTI', ioc: 'HTI', full: 'Haiti' },
  HU: { alpha3: 'HUN', ioc: 'HUN', full: 'Hungary' },
  ID: { alpha3: 'IDN', ioc: 'IDN', full: 'Indonesia' },
  IE: { alpha3: 'IRL', ioc: 'IRL', full: 'Ireland' },
  IL: { alpha3: 'ISR', ioc: 'ISR', full: 'Israel' },
  IM: { alpha3: 'IOM', ioc: 'IOM', full: 'Isle of Man' },
  IN: { alpha3: 'IND', ioc: 'IND', full: 'India' },
  IO: { alpha3: 'IOT', ioc: 'IOT', full: 'British Indian Ocean Territory' },
  IQ: { alpha3: 'IRQ', ioc: 'IRQ', full: 'Iraq' },
  IR: { alpha3: 'IRN', ioc: 'IRN', full: 'Iran' },
  IS: { alpha3: 'ISL', ioc: 'ISL', full: 'Iceland' },
  IT: { alpha3: 'ITA', ioc: 'ITA', full: 'Italy' },
  JE: { alpha3: 'JEY', ioc: 'JEY', full: 'Jersey' },
  JM: { alpha3: 'JAM', ioc: 'JAM', full: 'Jamaica' },
  JO: { alpha3: 'JOR', ioc: 'JOR', full: 'Jordan' },
  JP: { alpha3: 'JPN', ioc: 'JPN', full: 'Japan' },
  KE: { alpha3: 'KEN', ioc: 'KEN', full: 'Kenya' },
  KG: { alpha3: 'KGZ', ioc: 'KGZ', full: 'Kyrgyzstan' },
  KH: { alpha3: 'KHM', ioc: 'KHM', full: 'Cambodia' },
  KI: { alpha3: 'KIR', ioc: 'KIR', full: 'Kiribati' },
  KM: { alpha3: 'COM', ioc: 'COM', full: 'Comoros' },
  KN: { alpha3: 'KNA', ioc: 'KNA', full: 'Saint Kitts and Nevis' },
  KP: { alpha3: 'PRK', ioc: 'PRK', full: 'North Korea' },
  KR: { alpha3: 'KOR', ioc: 'KOR', full: 'South Korea' },
  KW: { alpha3: 'KWT', ioc: 'KWT', full: 'Kuwait' },
  KY: { alpha3: 'CYM', ioc: 'CYM', full: 'Cayman Islands' },
  KZ: { alpha3: 'KAZ', ioc: 'KAZ', full: 'Kazakhstan' },
  LA: { alpha3: 'LAO', ioc: 'LAO', full: 'Laos' },
  LB: { alpha3: 'LBN', ioc: 'LBN', full: 'Lebanon' },
  LC: { alpha3: 'LCA', ioc: 'LCA', full: 'Saint Lucia' },
  LI: { alpha3: 'LIE', ioc: 'LIE', full: 'Liechtenstein' },
  LK: { alpha3: 'LKA', ioc: 'LKA', full: 'Sri Lanka' },
  LR: { alpha3: 'LBR', ioc: 'LBR', full: 'Liberia' },
  LS: { alpha3: 'LSO', ioc: 'LSO', full: 'Lesotho' },
  LT: { alpha3: 'LTU', ioc: 'LTU', full: 'Lithuania' },
  LU: { alpha3: 'LUX', ioc: 'LUX', full: 'Luxembourg' },
  LV: { alpha3: 'LVA', ioc: 'LVA', full: 'Latvia' },
  LY: { alpha3: 'LBY', ioc: 'LBY', full: 'Libya' },
  MA: { alpha3: 'MAR', ioc: 'MAR', full: 'Morocco' },
  MC: { alpha3: 'MCO', ioc: 'MCO', full: 'Monaco' },
  MD: { alpha3: 'MDA', ioc: 'MDA', full: 'Moldova' },
  ME: { alpha3: 'MNE', ioc: 'MNE', full: 'Montenegro' },
  MF: { alpha3: 'MAF', ioc: 'MAF', full: 'Saint Martin' },
  MG: { alpha3: 'MDG', ioc: 'MDG', full: 'Madagascar' },
  MH: { alpha3: 'MHL', ioc: 'MHL', full: 'Marshall Islands' },
  MK: { alpha3: 'MKD', ioc: 'MKD', full: 'North Macedonia' },
  ML: { alpha3: 'MLI', ioc: 'MLI', full: 'Mali' },
  MM: { alpha3: 'MMR', ioc: 'MMR', full: 'Myanmar' },
  MN: { alpha3: 'MNG', ioc: 'MNG', full: 'Mongolia' },
  MO: { alpha3: 'MAC', ioc: 'MAC', full: 'Macao' },
  MP: { alpha3: 'NMP', ioc: 'NMP', full: 'Northern Mariana Islands' },
  MQ: { alpha3: 'MTQ', ioc: 'MTQ', full: 'Martinique' },
  MR: { alpha3: 'MRT', ioc: 'MRT', full: 'Mauritania' },
  MS: { alpha3: 'MSR', ioc: 'MSR', full: 'Montserrat' },
  MT: { alpha3: 'MLT', ioc: 'MLT', full: 'Malta' },
  MU: { alpha3: 'MUS', ioc: 'MUS', full: 'Mauritius' },
  MV: { alpha3: 'MDV', ioc: 'MDV', full: 'Maldives' },
  MW: { alpha3: 'MWI', ioc: 'MWI', full: 'Malawi' },
  MX: { alpha3: 'MEX', ioc: 'MEX', full: 'Mexico' },
  MY: { alpha3: 'MYS', ioc: 'MYS', full: 'Malaysia' },
  MZ: { alpha3: 'MOZ', ioc: 'MOZ', full: 'Mozambique' },
  NA: { alpha3: 'NAM', ioc: 'NAM', full: 'Namibia' },
  NC: { alpha3: 'NCL', ioc: 'NCL', full: 'New Caledonia' },
  NE: { alpha3: 'NER', ioc: 'NER', full: 'Niger' },
  NF: { alpha3: 'NFK', ioc: 'NFK', full: 'Norfolk Island' },
  NG: { alpha3: 'NGA', ioc: 'NGA', full: 'Nigeria' },
  NI: { alpha3: 'NIC', ioc: 'NIC', full: 'Nicaragua' },
  NL: { alpha3: 'NLD', ioc: 'NED', full: 'Netherlands' },
  NO: { alpha3: 'NOR', ioc: 'NOR', full: 'Norway' },
  NP: { alpha3: 'NPL', ioc: 'NEP', full: 'Nepal' },
  NR: { alpha3: 'NRU', ioc: 'NRU', full: 'Nauru' },
  NU: { alpha3: 'NIU', ioc: 'NIU', full: 'Niue' },
  NZ: { alpha3: 'NZL', ioc: 'NZL', full: 'New Zealand' },
  OM: { alpha3: 'OMA', ioc: 'OMA', full: 'Oman' },
  PA: { alpha3: 'PAN', ioc: 'PAN', full: 'Panama' },
  PE: { alpha3: 'PER', ioc: 'PER', full: 'Peru' },
  PF: { alpha3: 'PYF', ioc: 'PYF', full: 'French Polynesia' },
  PG: { alpha3: 'PNG', ioc: 'PNG', full: 'Papua New Guinea' },
  PH: { alpha3: 'PHL', ioc: 'PHI', full: 'Philippines' },
  PK: { alpha3: 'PAK', ioc: 'PAK', full: 'Pakistan' },
  PL: { alpha3: 'POL', ioc: 'POL', full: 'Poland' },
  PM: { alpha3: 'SPM', ioc: 'SPM', full: 'Saint Pierre and Miquelon' },
  PN: { alpha3: 'PCN', ioc: 'PCN', full: 'Pitcairn Islands' },
  PR: { alpha3: 'PUR', ioc: 'PUR', full: 'Puerto Rico' },
  PT: { alpha3: 'PRT', ioc: 'PRT', full: 'Portugal' },
  PW: { alpha3: 'PLW', ioc: 'PLW', full: 'Palau' },
  PY: { alpha3: 'PRY', ioc: 'PRY', full: 'Paraguay' },
  QA: { alpha3: 'QAT', ioc: 'QAT', full: 'Qatar' },
  RE: { alpha3: 'REU', ioc: 'REU', full: 'Réunion' },
  RO: { alpha3: 'ROU', ioc: 'ROU', full: 'Romania' },
  RS: { alpha3: 'SRB', ioc: 'SRB', full: 'Serbia' },
  RU: { alpha3: 'RUS', ioc: 'RUS', full: 'Russia' },
  RW: { alpha3: 'RWA', ioc: 'RWA', full: 'Rwanda' },
  SA: { alpha3: 'KSA', ioc: 'KSA', full: 'Saudi Arabia' },
  SB: { alpha3: 'SLB', ioc: 'SLB', full: 'Solomon Islands' },
  SC: { alpha3: 'SYC', ioc: 'SYC', full: 'Seychelles' },
  SCO: { alpha3: 'SCO', ioc: 'SCO', full: 'Scotland' },
  SD: { alpha3: 'SDN', ioc: 'SDN', full: 'Sudan' },
  SE: { alpha3: 'SWE', ioc: 'SWE', full: 'Sweden' },
  SG: { alpha3: 'SIN', ioc: 'SIN', full: 'Singapore' },
  SH: { alpha3: 'SHN', ioc: 'SHN', full: 'Saint Helena' },
  SI: { alpha3: 'SVN', ioc: 'SVN', full: 'Slovenia' },
  SJ: { alpha3: 'SJM', ioc: 'SJM', full: 'Svalbard and Jan Mayen' },
  SK: { alpha3: 'SVK', ioc: 'SVK', full: 'Slovakia' },
  SL: { alpha3: 'SLE', ioc: 'SLE', full: 'Sierra Leone' },
  SM: { alpha3: 'SMR', ioc: 'SMR', full: 'San Marino' },
  SN: { alpha3: 'SEN', ioc: 'SEN', full: 'Senegal' },
  SO: { alpha3: 'SOM', ioc: 'SOM', full: 'Somalia' },
  SR: { alpha3: 'SUR', ioc: 'SUR', full: 'Suriname' },
  SS: { alpha3: 'SSD', ioc: 'SSD', full: 'South Sudan' },
  ST: { alpha3: 'STP', ioc: 'STP', full: 'São Tomé and Príncipe' },
  SV: { alpha3: 'SLV', ioc: 'SLV', full: 'El Salvador' },
  SX: { alpha3: 'SXM', ioc: 'SXM', full: 'Sint Maarten' },
  SY: { alpha3: 'SYR', ioc: 'SYR', full: 'Syria' },
  SZ: { alpha3: 'SWZ', ioc: 'SWZ', full: 'Eswatini' },
  TC: { alpha3: 'TCA', ioc: 'TCA', full: 'Turks and Caicos Islands' },
  TD: { alpha3: 'TCD', ioc: 'TCD', full: 'Chad' },
  TF: { alpha3: 'ATF', ioc: 'ATF', full: 'French Southern Territories' },
  TG: { alpha3: 'TGO', ioc: 'TGO', full: 'Togo' },
  TH: { alpha3: 'THA', ioc: 'THA', full: 'Thailand' },
  TJ: { alpha3: 'TJK', ioc: 'TJK', full: 'Tajikistan' },
  TK: { alpha3: 'TKL', ioc: 'TKL', full: 'Tokelau' },
  TL: { alpha3: 'TLS', ioc: 'TLS', full: 'Timor-Leste' },
  TM: { alpha3: 'TKM', ioc: 'TKM', full: 'Turkmenistan' },
  TN: { alpha3: 'TUN', ioc: 'TUN', full: 'Tunisia' },
  TO: { alpha3: 'TON', ioc: 'TON', full: 'Tonga' },
  TR: { alpha3: 'TUR', ioc: 'TUR', full: 'Turkey' },
  TT: { alpha3: 'TTO', ioc: 'TTO', full: 'Trinidad and Tobago' },
  TV: { alpha3: 'TUV', ioc: 'TUV', full: 'Tuvalu' },
  TZ: { alpha3: 'TZA', ioc: 'TAN', full: 'Tanzania' },
  UA: { alpha3: 'UKR', ioc: 'UKR', full: 'Ukraine' },
  UG: { alpha3: 'UGA', ioc: 'UGA', full: 'Uganda' },
  UM: { alpha3: 'UMI', ioc: 'UMI', full: 'United States Minor Outlying Islands' },
  UN: { alpha3: 'UNK', ioc: 'UNK', full: 'Unknown' },
  US: { alpha3: 'USA', ioc: 'USA', full: 'United States' },
  UY: { alpha3: 'URY', ioc: 'URU', full: 'Uruguay' },
  UZ: { alpha3: 'UZB', ioc: 'UZB', full: 'Uzbekistan' },
  VA: { alpha3: 'VAT', ioc: 'VAT', full: 'Vatican City' },
  VC: { alpha3: 'VCT', ioc: 'VCT', full: 'Saint Vincent and the Grenadines' },
  VE: { alpha3: 'VEN', ioc: 'VEN', full: 'Venezuela' },
  VG: { alpha3: 'VGB', ioc: 'VGB', full: 'British Virgin Islands' },
  VI: { alpha3: 'VIR', ioc: 'VIR', full: 'United States Virgin Islands' },
  VN: { alpha3: 'VNM', ioc: 'VNM', full: 'Vietnam' },
  VU: { alpha3: 'VUT', ioc: 'VUT', full: 'Vanuatu' },
  WF: { alpha3: 'WLF', ioc: 'WLF', full: 'Wallis and Futuna' },
  WS: { alpha3: 'WSM', ioc: 'WSM', full: 'Samoa' },
  YE: { alpha3: 'YEM', ioc: 'YEM', full: 'Yemen' },
  YT: { alpha3: 'MYT', ioc: 'MYT', full: 'Mayotte' },
  ZA: { alpha3: 'ZAF', ioc: 'RSA', full: 'South Africa' },
  ZM: { alpha3: 'ZMB', ioc: 'ZAM', full: 'Zambia' },
  ZW: { alpha3: 'ZWE', ioc: 'ZIM', full: 'Zimbabwe' },
}

// Reverse mapping: IOC and Alpha-3 to Alpha-2 and full name
const reverseMapping = Object.fromEntries(
  Object.entries(countryCodeMapping).flatMap(([alpha2, { alpha3, ioc, full }]) => [
    [ioc, { alpha2, alpha3, full }],
    [alpha3, { alpha2, ioc, full }],
  ]),
)

export function convertAlpha2ToIoc(alpha2Code) {
  if (!alpha2Code || typeof alpha2Code !== 'string') {
    console.error('[country] Invalid alpha2Code:', alpha2Code)
    return 'Unknown'
  }
  const mapping = countryCodeMapping[alpha2Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-2 code not found:', alpha2Code)
    return 'Unknown'
  }
  return mapping.ioc
}

export function convertIocToAlpha2(iocCode) {
  if (!iocCode || typeof iocCode !== 'string') {
    console.error('[country] Invalid iocCode:', iocCode)
    return 'Unknown'
  }
  const mapping = reverseMapping[iocCode.toUpperCase()]
  if (!mapping) {
    console.warn('[country] IOC code not found:', iocCode)
    return 'Unknown'
  }
  return mapping.alpha2
}

export function convertAlpha3ToIoc(alpha3Code) {
  if (!alpha3Code || typeof alpha3Code !== 'string') {
    console.error('[country] Invalid alpha3Code:', alpha3Code)
    return 'Unknown'
  }
  const mapping = reverseMapping[alpha3Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-3 code not found:', alpha3Code)
    return 'Unknown'
  }
  return mapping.ioc
}

export function convertIocToAlpha3(iocCode) {
  if (!iocCode || typeof iocCode !== 'string') {
    console.error('[country] Invalid iocCode:', iocCode)
    return 'Unknown'
  }
  const mapping = reverseMapping[iocCode.toUpperCase()]
  if (!mapping) {
    console.warn('[country] IOC code not found:', iocCode)
    return 'Unknown'
  }
  return mapping.alpha3
}

export function convertAlpha2ToAlpha3(alpha2Code) {
  if (!alpha2Code || typeof alpha2Code !== 'string') {
    console.error('[country] Invalid alpha2Code:', alpha2Code)
    return 'Unknown'
  }
  const mapping = countryCodeMapping[alpha2Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-2 code not found:', alpha2Code)
    return 'Unknown'
  }
  return mapping.alpha3
}

export function convertAlpha3ToAlpha2(alpha3Code) {
  if (!alpha3Code || typeof alpha3Code !== 'string') {
    console.error('[country] Invalid alpha3Code:', alpha3Code)
    return 'Unknown'
  }
  const mapping = reverseMapping[alpha3Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-3 code not found:', alpha3Code)
    return 'Unknown'
  }
  return mapping.alpha2
}

export function convertAlpha2ToFull(alpha2Code) {
  if (!alpha2Code || typeof alpha2Code !== 'string') {
    console.error('[country] Invalid alpha2Code:', alpha2Code)
    return 'Unknown'
  }
  const mapping = countryCodeMapping[alpha2Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-2 code not found:', alpha2Code)
    return 'Unknown'
  }
  return mapping.full
}

export function convertAlpha3ToFull(alpha3Code) {
  if (!alpha3Code || typeof alpha3Code !== 'string') {
    console.error('[country] Invalid alpha3Code:', alpha3Code)
    return 'Unknown'
  }
  const mapping = reverseMapping[alpha3Code.toUpperCase()]
  if (!mapping) {
    console.warn('[country] Alpha-3 code not found:', alpha3Code)
    return 'Unknown'
  }
  return mapping.full
}

export function convertIocToFull(iocCode) {
  if (!iocCode || typeof iocCode !== 'string') {
    console.error('[country] Invalid iocCode:', iocCode)
    return 'Unknown'
  }
  const mapping = reverseMapping[iocCode.toUpperCase()]
  if (!mapping) {
    console.warn('[country] IOC code not found:', iocCode)
    return 'Unknown'
  }
  return mapping.full
}

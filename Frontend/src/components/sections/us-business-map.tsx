import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";

// Regions definition
const regions = {
  westCoast: {
    name: "West Coast",
    states: ["california", "oregon", "washington", "alaska", "hawaii"],
  },
  southwest: {
    name: "Southwest",
    states: ["nevada", "arizona", "utah", "colorado", "new_mexico"],
  },
  midwest: {
    name: "Midwest",
    states: [
      "illinois",
      "michigan",
      "ohio",
      "indiana",
      "wisconsin",
      "minnesota",
      "iowa",
      "missouri",
      "kansas",
      "nebraska",
      "south_dakota",
      "north_dakota",
    ],
  },
  northeast: {
    name: "Northeast",
    states: [
      "new_york",
      "massachusetts",
      "pennsylvania",
      "new_jersey",
      "connecticut",
      "rhode_island",
      "vermont",
      "new_hampshire",
      "maine",
    ],
  },
  southeast: {
    name: "Southeast",
    states: [
      "florida",
      "georgia",
      "north_carolina",
      "south_carolina",
      "virginia",
      "west_virginia",
      "kentucky",
      "tennessee",
      "alabama",
      "mississippi",
      "louisiana",
      "arkansas",
    ],
  },
  midAtlantic: {
    name: "Mid-Atlantic",
    states: ["delaware", "maryland", "district_of_columbia"],
  },
  mountain: {
    name: "Mountain",
    states: ["montana", "idaho", "wyoming"],
  },
  southCentral: {
    name: "South Central",
    states: ["texas", "oklahoma"],
  },
};

// Mock data for US states business formation information
const statesData = {
  // West Coast
  california: {
    name: "California",
    formationTime: "5-7 business days",
    annualFee: "$800 minimum franchise tax",
    popularity: "Very High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Sole Proprietorship",
    ],
    keyBenefits: [
      "Large economy and market access",
      "Tech industry hub",
      "Access to venture capital",
    ],
    challenges: [
      "Higher taxes and fees",
      "Complex regulations",
      "Higher cost of living",
    ],
  },
  oregon: {
    name: "Oregon",
    formationTime: "3-5 business days",
    annualFee: "$100 annual report fee",
    popularity: "Medium",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Benefit Company"],
    keyBenefits: [
      "No sales tax",
      "Growing tech scene",
      "Lower business costs than California",
    ],
    challenges: [
      "High income tax rates",
      "Complex employment regulations",
      "Limited access to capital compared to CA",
    ],
  },
  washington: {
    name: "Washington",
    formationTime: "2-5 business days",
    annualFee: "$60 annual report fee + B&O tax",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Social Purpose Corporation",
    ],
    keyBenefits: [
      "No state income tax",
      "Strong tech and aerospace industry",
      "International trade hub",
    ],
    challenges: [
      "Business & Occupation (B&O) tax",
      "High cost of living in metro areas",
      "Complex sales tax system",
    ],
  },
  alaska: {
    name: "Alaska",
    formationTime: "7-10 business days",
    annualFee: "$100 biennial report fee",
    popularity: "Low",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation"],
    keyBenefits: [
      "No state income or sales tax",
      "Natural resource opportunities",
      "Permanent Fund Dividend",
    ],
    challenges: [
      "Remote location and logistics",
      "Harsh climate",
      "Seasonal economy",
    ],
  },
  hawaii: {
    name: "Hawaii",
    formationTime: "5-7 business days",
    annualFee: "$15 annual report fee",
    popularity: "Low",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation"],
    keyBenefits: [
      "Tourism-driven economy",
      "Unique geographical position for Pacific trade",
      "Strong hospitality sector",
    ],
    challenges: [
      "High cost of living and doing business",
      "Remote location and shipping costs",
      "Limited space and resources",
    ],
  },

  // Southwest
  nevada: {
    name: "Nevada",
    formationTime: "1-3 business days",
    annualFee: "$350 annual fee + $200 business license",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Close Corporation",
    ],
    keyBenefits: [
      "No state income tax",
      "No franchise tax",
      "Strong privacy protections",
    ],
    challenges: [
      "Commerce tax for businesses with revenue over $4M",
      "Annual filing requirements",
      "Business license fees",
    ],
  },
  arizona: {
    name: "Arizona",
    formationTime: "3-5 business days",
    annualFee: "$45 annual report fee",
    popularity: "Medium-High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Low corporate tax rate",
      "Growing tech ecosystem",
      "Lower cost of living than neighboring CA",
    ],
    challenges: [
      "Transaction privilege tax system",
      "Varying local business regulations",
      "Extreme heat affecting some industries",
    ],
  },
  utah: {
    name: "Utah",
    formationTime: "5-7 business days",
    annualFee: "$70 annual report fee",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Business-friendly regulations",
      "Growing tech sector ('Silicon Slopes')",
      "Educated workforce",
    ],
    challenges: [
      "Complex sales tax system",
      "Limited international flights",
      "Challenging liquor laws for hospitality businesses",
    ],
  },
  colorado: {
    name: "Colorado",
    formationTime: "1-3 business days",
    annualFee: "$10 annual report fee",
    popularity: "Medium-High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Public Benefit Corporation",
    ],
    keyBenefits: [
      "Strong startup ecosystem",
      "Educated workforce",
      "Quality of life attracting talent",
    ],
    challenges: [
      "Increasing business costs",
      "Local tax complexities",
      "Competitive labor market",
    ],
  },
  new_mexico: {
    name: "New Mexico",
    formationTime: "3-5 business days",
    annualFee: "$0 (no annual report for corporations, $0 for LLCs)",
    popularity: "Low",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation"],
    keyBenefits: [
      "Low cost of doing business",
      "Incentives for manufacturing and film",
      "Diverse culture and tourism potential",
    ],
    challenges: [
      "Limited access to capital",
      "Smaller labor market",
      "Remote location challenges",
    ],
  },

  // Midwest
  illinois: {
    name: "Illinois",
    formationTime: "10-15 business days",
    annualFee: "$75 annual report fee (LLC), $150 (Corp)",
    popularity: "Medium-High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Major transportation hub",
      "Large skilled workforce",
      "Strong manufacturing base",
    ],
    challenges: [
      "High taxes",
      "Complex regulations",
      "Financial challenges at state level",
    ],
  },
  michigan: {
    name: "Michigan",
    formationTime: "3-5 business days",
    annualFee: "$25 annual report fee",
    popularity: "Medium",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Low-profit LLC"],
    keyBenefits: [
      "Manufacturing expertise",
      "Lower cost of living",
      "Growing tech scene in Detroit",
    ],
    challenges: [
      "Economic fluctuations",
      "Weather impacts on some industries",
      "Varying regional economies",
    ],
  },
  ohio: {
    name: "Ohio",
    formationTime: "3-7 business days",
    annualFee: "$0 (no annual report fee)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Central location for distribution",
      "Manufacturing infrastructure",
      "Lower operating costs",
    ],
    challenges: [
      "Commercial activity tax",
      "Municipal income taxes",
      "Workforce challenges in some areas",
    ],
  },

  // Northeast
  new_york: {
    name: "New York",
    formationTime: "7-10 business days",
    annualFee: "$9 biennial statement fee + publication requirement",
    popularity: "Very High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Global financial center",
      "Diverse talent pool",
      "Access to capital and markets",
    ],
    challenges: [
      "High taxes and costs",
      "Complex regulatory environment",
      "LLC publication requirement ($1,000+)",
    ],
  },
  massachusetts: {
    name: "Massachusetts",
    formationTime: "5-7 business days",
    annualFee: "$500 annual report fee (Corps), $520 (LLCs)",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Innovation ecosystem",
      "Top universities and research",
      "Strong life sciences and tech sectors",
    ],
    challenges: [
      "High costs of operation",
      "Complex regulatory environment",
      "High minimum corporate excise tax",
    ],
  },

  // Southeast
  florida: {
    name: "Florida",
    formationTime: "3-5 business days",
    annualFee: "$138.75 for LLC, $150 for corporations",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Sole Proprietorship",
    ],
    keyBenefits: [
      "No state income tax",
      "Growing economy",
      "Business-friendly regulations",
    ],
    challenges: [
      "Sales tax complexities",
      "Hurricane insurance costs",
      "Seasonal business fluctuations",
    ],
  },
  georgia: {
    name: "Georgia",
    formationTime: "5-7 business days",
    annualFee: "$50 annual registration fee",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Close Corporation",
    ],
    keyBenefits: [
      "Major logistics and transportation hub",
      "Growing film and tech industries",
      "Lower cost of living than many states",
    ],
    challenges: [
      "Complex local tax systems",
      "City/county tax requirements",
      "Varying regulations by locality",
    ],
  },

  // Mid-Atlantic
  delaware: {
    name: "Delaware",
    formationTime: "1-3 business days",
    annualFee: "$300 franchise tax (minimum)",
    popularity: "Very High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Statutory Trust"],
    keyBenefits: [
      "Corporate-friendly laws",
      "Court of Chancery specialized in business cases",
      "No state income tax for companies not operating in Delaware",
    ],
    challenges: [
      "Additional fees for out-of-state operations",
      "Registered agent required",
      "May still need to register in states where you do business",
    ],
  },

  // Mountain
  wyoming: {
    name: "Wyoming",
    formationTime: "3-5 business days",
    annualFee: "$50-$60 annual report fee",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Close Corporation",
    ],
    keyBenefits: [
      "No corporate or personal income tax",
      "Low annual fees",
      "Strong privacy laws",
    ],
    challenges: [
      "Limited access to major markets",
      "Smaller talent pool",
      "Extreme weather conditions",
    ],
  },

  // South Central
  texas: {
    name: "Texas",
    formationTime: "3-5 business days",
    annualFee: "$0 annual report fee (but franchise tax filing)",
    popularity: "Very High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Series LLC"],
    keyBenefits: [
      "No state income tax",
      "Business-friendly regulations",
      "Large economy with diverse industries",
    ],
    challenges: [
      "Franchise tax system",
      "Property taxes can be high",
      "Varying local regulations",
    ],
  },
  // Remaining states referenced by the region lists.
  idaho: {
    name: "Idaho",
    formationTime: "3-5 business days",
    annualFee: "$0 annual report (filing required)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No fee on the annual report",
      "Low overall business costs",
      "Fast online filing",
    ],
    challenges: [
      "Small local market",
      "Limited access to venture capital",
      "Fewer specialised service providers",
    ],
  },
  montana: {
    name: "Montana",
    formationTime: "3-5 business days",
    annualFee: "$20 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Series LLC",
    ],
    keyBenefits: [
      "No general sales tax",
      "Very low annual report fee",
      "Straightforward filing process",
    ],
    challenges: [
      "Small population and local market",
      "Distance from major distribution hubs",
      "Limited local talent pool",
    ],
  },
  nebraska: {
    name: "Nebraska",
    formationTime: "3-5 business days",
    annualFee: "$25 biennial report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional Corporation",
    ],
    keyBenefits: [
      "Low biennial filing cost",
      "Central location for logistics",
      "Stable, low-cost operating base",
    ],
    challenges: [
      "Publication requirement for new LLCs",
      "Smaller consumer market",
      "Limited startup funding locally",
    ],
  },
  kansas: {
    name: "Kansas",
    formationTime: "2-4 business days",
    annualFee: "$50 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low formation and maintenance costs",
      "Central US location",
      "Simple online filing",
    ],
    challenges: [
      "Smaller local market",
      "Limited venture funding",
      "Local tax layers vary by county",
    ],
  },
  iowa: {
    name: "Iowa",
    formationTime: "3-5 business days",
    annualFee: "$30 biennial report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low biennial fee",
      "Strong agricultural and manufacturing base",
      "Affordable operating costs",
    ],
    challenges: [
      "Smaller consumer market",
      "Winter weather disruption",
      "Limited access to coastal investors",
    ],
  },
  minnesota: {
    name: "Minnesota",
    formationTime: "2-4 business days",
    annualFee: "$0 annual renewal (filing required)",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional Firm",
    ],
    keyBenefits: [
      "No fee on the annual renewal",
      "Large corporate headquarters base",
      "Skilled, educated workforce",
    ],
    challenges: [
      "Higher personal and corporate income tax",
      "Higher cost of labour",
      "Cold-weather operating costs",
    ],
  },
  wisconsin: {
    name: "Wisconsin",
    formationTime: "3-5 business days",
    annualFee: "$25 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low annual report fee",
      "Strong manufacturing supply chain",
      "Reasonable operating costs",
    ],
    challenges: [
      "Moderate income tax rates",
      "Smaller tech investment scene",
      "Seasonal demand swings",
    ],
  },
  indiana: {
    name: "Indiana",
    formationTime: "1-3 business days",
    annualFee: "$32 biennial report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Low biennial filing fee",
      "Flat, competitive corporate tax rate",
      "Central logistics location",
    ],
    challenges: [
      "Smaller venture capital presence",
      "County-level tax variation",
      "Limited coastal market access",
    ],
  },
  missouri: {
    name: "Missouri",
    formationTime: "1-3 business days",
    annualFee: "$0 for LLCs (no annual report)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No annual report requirement for LLCs",
      "Low cost of living and labour",
      "Two large metro markets",
    ],
    challenges: [
      "Corporations still file annually",
      "Local licence requirements vary",
      "Smaller investor network",
    ],
  },
  kentucky: {
    name: "Kentucky",
    formationTime: "2-4 business days",
    annualFee: "$15 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Very low annual report fee",
      "Logistics and air-freight hub",
      "Low operating costs",
    ],
    challenges: [
      "Limited liability entity tax applies",
      "Local occupational taxes",
      "Smaller local market",
    ],
  },
  tennessee: {
    name: "Tennessee",
    formationTime: "1-3 business days",
    annualFee: "$300 minimum annual report (LLC)",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No personal income tax on wages",
      "Strong logistics and music/health sectors",
      "Fast online filing",
    ],
    challenges: [
      "Franchise and excise tax on entities",
      "Annual fee scales with membership",
      "Higher LLC maintenance cost",
    ],
  },
  alabama: {
    name: "Alabama",
    formationTime: "5-7 business days",
    annualFee: "$50 minimum business privilege tax",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low overall operating costs",
      "Growing manufacturing base",
      "Affordable commercial property",
    ],
    challenges: [
      "Business privilege tax filing each year",
      "County and city licensing layers",
      "Smaller professional talent pool",
    ],
  },
  mississippi: {
    name: "Mississippi",
    formationTime: "2-4 business days",
    annualFee: "$0 annual report (filing required)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No fee on the annual report",
      "Lowest operating costs in the region",
      "Simple online filing",
    ],
    challenges: [
      "Small consumer market",
      "Limited access to capital",
      "Fewer specialised advisers",
    ],
  },
  louisiana: {
    name: "Louisiana",
    formationTime: "3-5 business days",
    annualFee: "$35 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Port access for import and export",
      "Industry incentives for film and energy",
      "Moderate filing costs",
    ],
    challenges: [
      "Parish-level tax complexity",
      "Hurricane insurance costs",
      "Franchise tax on corporations",
    ],
  },
  arkansas: {
    name: "Arkansas",
    formationTime: "2-4 business days",
    annualFee: "$150 annual franchise tax (LLC)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low cost of doing business",
      "Central distribution location",
      "Straightforward formation",
    ],
    challenges: [
      "Flat franchise tax regardless of income",
      "Smaller local market",
      "Limited investor network",
    ],
  },
  oklahoma: {
    name: "Oklahoma",
    formationTime: "2-4 business days",
    annualFee: "$25 annual certificate (LLC)",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Low annual maintenance cost",
      "Energy sector opportunities",
      "Affordable commercial space",
    ],
    challenges: [
      "Franchise tax for corporations",
      "Weather-related risk",
      "Smaller talent pool",
    ],
  },
  pennsylvania: {
    name: "Pennsylvania",
    formationTime: "5-10 business days",
    annualFee: "$7 annual report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Very low annual report fee",
      "Large consumer market and ports",
      "Strong healthcare and education sectors",
    ],
    challenges: [
      "Newspaper publication required for corporations",
      "Local earned income taxes",
      "Slower processing than neighbours",
    ],
  },
  maryland: {
    name: "Maryland",
    formationTime: "5-7 business days",
    annualFee: "$300 annual report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Proximity to federal agencies and contracts",
      "Highly educated workforce",
      "Strong biotech corridor",
    ],
    challenges: [
      "$300 flat annual report fee",
      "Higher tax burden",
      "Personal property tax filing",
    ],
  },
  virginia: {
    name: "Virginia",
    formationTime: "2-4 business days",
    annualFee: "$50 annual registration (LLC)",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Major federal contracting market",
      "Data centre and tech corridor",
      "Reasonable annual fees",
    ],
    challenges: [
      "Local BPOL business licence tax",
      "Higher costs in Northern Virginia",
      "Registered agent must be in state",
    ],
  },
  connecticut: {
    name: "Connecticut",
    formationTime: "3-5 business days",
    annualFee: "$80 annual report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Access to New York and Boston markets",
      "Strong finance and insurance sectors",
      "High household income base",
    ],
    challenges: [
      "Higher annual report fee",
      "Business entity tax history",
      "High cost of living and wages",
    ],
  },
  maine: {
    name: "Maine",
    formationTime: "3-5 business days",
    annualFee: "$85 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Strong tourism and food sectors",
      "Quality of life attracts remote founders",
      "Simple filing process",
    ],
    challenges: [
      "Seasonal revenue swings",
      "Small year-round market",
      "Distance from major hubs",
    ],
  },
  vermont: {
    name: "Vermont",
    formationTime: "3-5 business days",
    annualFee: "$35 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Benefit Corporation",
    ],
    keyBenefits: [
      "Low annual report fee",
      "Benefit corporation friendly",
      "Simple online filing",
    ],
    challenges: [
      "Very small local market",
      "Limited workforce",
      "Higher income tax rates",
    ],
  },
  new_jersey: {
    name: "New Jersey",
    formationTime: "3-5 business days",
    annualFee: "$75 annual report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Direct access to the New York metro market",
      "Major port and logistics network",
      "Dense professional talent pool",
    ],
    challenges: [
      "Higher corporate tax rates",
      "High cost of commercial space",
      "Layered local regulation",
    ],
  },
  new_hampshire: {
    name: "New Hampshire",
    formationTime: "3-5 business days",
    annualFee: "$100 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No sales tax and no tax on wages",
      "Close to the Boston market",
      "Straightforward filing",
    ],
    challenges: [
      "Business profits and enterprise taxes",
      "Small local workforce",
      "Seasonal tourism swings",
    ],
  },
  rhode_island: {
    name: "Rhode Island",
    formationTime: "3-5 business days",
    annualFee: "$50 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Compact market close to Boston",
      "Port access",
      "Low annual report fee",
    ],
    challenges: [
      "Minimum corporate tax applies",
      "Smallest state market",
      "Higher energy costs",
    ],
  },
  north_carolina: {
    name: "North Carolina",
    formationTime: "3-5 business days",
    annualFee: "$200 annual report (LLC)",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Research Triangle talent and universities",
      "Competitive flat corporate tax rate",
      "Fast-growing population",
    ],
    challenges: [
      "$200 annual report fee for LLCs",
      "Rising metro costs",
      "Franchise tax on corporations",
    ],
  },
  south_carolina: {
    name: "South Carolina",
    formationTime: "3-5 business days",
    annualFee: "$0 annual report for LLCs",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No annual report requirement for most LLCs",
      "Port of Charleston access",
      "Low operating costs",
    ],
    challenges: [
      "Corporations file annually with tax return",
      "Smaller professional talent pool",
      "Coastal insurance costs",
    ],
  },
  west_virginia: {
    name: "West Virginia",
    formationTime: "3-5 business days",
    annualFee: "$25 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Very low annual report fee",
      "Low property and operating costs",
      "Incentives for new employers",
    ],
    challenges: [
      "Small consumer market",
      "Terrain complicates logistics",
      "Limited local investment capital",
    ],
  },
  north_dakota: {
    name: "North Dakota",
    formationTime: "3-5 business days",
    annualFee: "$50 annual report",
    popularity: "Medium",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Strong energy and agriculture sectors",
      "Low unemployment",
      "Business-friendly filing process",
    ],
    challenges: [
      "Very small population",
      "Severe winter conditions",
      "Distance from major markets",
    ],
  },
  south_dakota: {
    name: "South Dakota",
    formationTime: "2-4 business days",
    annualFee: "$50 annual report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "No corporate or personal income tax",
      "Strong trust and banking framework",
      "Low annual maintenance",
    ],
    challenges: [
      "Small local market",
      "Limited talent pool",
      "Winter weather disruption",
    ],
  },
  district_of_columbia: {
    name: "District of Columbia",
    formationTime: "5-7 business days",
    annualFee: "$300 biennial report",
    popularity: "High",
    businessTypes: [
      "LLC",
      "C-Corporation",
      "S-Corporation",
      "Professional LLC",
    ],
    keyBenefits: [
      "Direct access to federal agencies and contracts",
      "Dense professional and policy network",
      "International presence",
    ],
    challenges: [
      "Higher franchise tax floor",
      "Expensive commercial rent",
      "Clean Hands certification required",
    ],
  },
};

type StateKey = keyof typeof statesData;

export function USBusinessMap() {
  const [selectedState, setSelectedState] = useState<StateKey | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const handleStateClick = (state: StateKey) => {
    setSelectedState(state);
  };

  const toggleRegion = (regionKey: string) => {
    if (activeRegion === regionKey) {
      setActiveRegion(null);
    } else {
      setActiveRegion(regionKey);
    }
  };

  // Function to render state buttons for a given region
  const renderStateButtons = (regionKey: string) => {
    const regionStates = regions[regionKey as keyof typeof regions].states;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {regionStates
          .map((stateKey) => {
            // Only render buttons for states that exist in statesData
            if (stateKey in statesData) {
              return (
                <button
                  key={stateKey}
                  onClick={() => handleStateClick(stateKey as StateKey)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    selectedState === stateKey
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {statesData[stateKey as StateKey].name}
                </button>
              );
            }
            return null;
          })
          .filter(Boolean)}
      </div>
    );
  };

  return (
    <section className="section bg-background py-16 relative" id="business-map">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-accent border-accent">
            Interactive Guide
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            US Business Formation Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore different states for business formation by region. Click on
            a state to learn more about incorporation requirements, fees, and
            strategic advantages.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground">
            Filing times and fees are indicative and change from year to year. We
            confirm the current figures for your state before filing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-xl shadow-custom p-6 max-h-[600px] overflow-y-auto">
            <div className="relative w-full">
              <p className="text-lg font-medium mb-4">
                Select a region and state to view business formation details:
              </p>

              <div className="space-y-4">
                {Object.entries(regions).map(([key, region]) => (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRegion(key)}
                      className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
                    >
                      <span className="font-medium">{region.name}</span>
                      <span>
                        {activeRegion === key ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-up"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-down"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        )}
                      </span>
                    </button>

                    {activeRegion === key && (
                      <div className="p-3 bg-white border-t">
                        {renderStateButtons(key)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {selectedState ? (
              <Card>
                <CardHeader>
                  <CardTitle>{statesData[selectedState].name}</CardTitle>
                  <CardDescription>Business Formation Overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Formation Time:
                      </h4>
                      <p className="font-medium">
                        {statesData[selectedState].formationTime}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Annual Fee:
                      </h4>
                      <p className="font-medium">
                        {statesData[selectedState].annualFee}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Popularity:
                      </h4>
                      <p className="font-medium">
                        {statesData[selectedState].popularity}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Business Types:
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {statesData[selectedState].businessTypes.map(
                          (type, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Key Benefits:
                      </h4>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        {statesData[selectedState].keyBenefits.map(
                          (benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Challenges:
                      </h4>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        {statesData[selectedState].challenges.map(
                          (challenge, idx) => (
                            <li key={idx}>{challenge}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Select a state from any region to view business formation
                    details.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This interactive map provides a simplified overview of business
            formation options across different regions and states. For
            personalized guidance based on your specific business needs,
            <a
              href={COMPANY.calendly}
              target="_blank"
              className="text-primary hover:underline"
            >
              {" "}
              schedule a consultation
            </a>{" "}
            with our experts.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}

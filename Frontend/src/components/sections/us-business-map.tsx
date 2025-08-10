import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
              href="https://calendly.com/haytrex-info/consultation-meeting"
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

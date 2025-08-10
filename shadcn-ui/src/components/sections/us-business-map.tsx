import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for US states business formation information
const statesData = {
  california: {
    name: "California",
    formationTime: "5-7 business days",
    annualFee: "$800 minimum franchise tax",
    popularity: "Very High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Sole Proprietorship"],
    keyBenefits: [
      "Large economy and market access",
      "Tech industry hub",
      "Access to venture capital"
    ],
    challenges: [
      "Higher taxes and fees",
      "Complex regulations",
      "Higher cost of living"
    ]
  },
  delaware: {
    name: "Delaware",
    formationTime: "1-3 business days",
    annualFee: "$300 franchise tax (minimum)",
    popularity: "Very High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Statutory Trust"],
    keyBenefits: [
      "Corporate-friendly laws",
      "Court of Chancery specialized in business cases",
      "No state income tax for companies not operating in Delaware"
    ],
    challenges: [
      "Additional fees for out-of-state operations",
      "Registered agent required",
      "May still need to register in states where you do business"
    ]
  },
  nevada: {
    name: "Nevada",
    formationTime: "1-3 business days",
    annualFee: "$350 annual fee + $200 business license",
    popularity: "High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Close Corporation"],
    keyBenefits: [
      "No state income tax",
      "No franchise tax",
      "Strong privacy protections"
    ],
    challenges: [
      "Commerce tax for businesses with revenue over $4M",
      "Annual filing requirements",
      "Business license fees"
    ]
  },
  wyoming: {
    name: "Wyoming",
    formationTime: "3-5 business days",
    annualFee: "$50-$60 annual report fee",
    popularity: "Medium",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Close Corporation"],
    keyBenefits: [
      "No corporate or personal income tax",
      "Low annual fees",
      "Strong privacy laws"
    ],
    challenges: [
      "Limited access to major markets",
      "Smaller talent pool",
      "Extreme weather conditions"
    ]
  },
  florida: {
    name: "Florida",
    formationTime: "3-5 business days",
    annualFee: "$138.75 for LLC, $150 for corporations",
    popularity: "High",
    businessTypes: ["LLC", "C-Corporation", "S-Corporation", "Sole Proprietorship"],
    keyBenefits: [
      "No state income tax",
      "Growing economy",
      "Business-friendly regulations"
    ],
    challenges: [
      "Sales tax complexities",
      "Hurricane insurance costs",
      "Seasonal business fluctuations"
    ]
  }
};

type StateKey = keyof typeof statesData;

export function USBusinessMap() {
  const [selectedState, setSelectedState] = useState<StateKey | null>(null);
  
  const handleStateClick = (state: StateKey) => {
    setSelectedState(state);
  };
  
  return (
    <section className="section bg-background py-16 relative" id="business-map">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-accent border-accent">Interactive Guide</Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">US Business Formation Map</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore different states for business formation. Click on a state to learn more about incorporation requirements,
            fees, and strategic advantages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-xl shadow-custom p-4 h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Interactive SVG Map would go here - simplified version with clickable buttons for now */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-muted-foreground mb-4">Select a state to view business formation details:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleStateClick('california')}
                    className={`px-4 py-2 rounded-md transition-all ${selectedState === 'california' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    California
                  </button>
                  <button
                    onClick={() => handleStateClick('delaware')}
                    className={`px-4 py-2 rounded-md transition-all ${selectedState === 'delaware' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Delaware
                  </button>
                  <button
                    onClick={() => handleStateClick('nevada')}
                    className={`px-4 py-2 rounded-md transition-all ${selectedState === 'nevada' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Nevada
                  </button>
                  <button
                    onClick={() => handleStateClick('wyoming')}
                    className={`px-4 py-2 rounded-md transition-all ${selectedState === 'wyoming' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Wyoming
                  </button>
                  <button
                    onClick={() => handleStateClick('florida')}
                    className={`px-4 py-2 rounded-md transition-all ${selectedState === 'florida' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Florida
                  </button>
                </div>
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
                      <h4 className="font-medium text-sm text-muted-foreground">Formation Time:</h4>
                      <p className="font-medium">{statesData[selectedState].formationTime}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Annual Fee:</h4>
                      <p className="font-medium">{statesData[selectedState].annualFee}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Popularity:</h4>
                      <p className="font-medium">{statesData[selectedState].popularity}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Business Types:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {statesData[selectedState].businessTypes.map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{type}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Key Benefits:</h4>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        {statesData[selectedState].keyBenefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Challenges:</h4>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        {statesData[selectedState].challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-muted-foreground">Select a state from the map to view business formation details.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This interactive map provides a simplified overview of business formation options across selected states.
            For personalized guidance based on your specific business needs, 
            <a href="#consultation" className="text-primary hover:underline"> schedule a consultation</a> with our experts.
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
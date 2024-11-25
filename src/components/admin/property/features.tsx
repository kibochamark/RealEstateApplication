import React from 'react';
import { Badge } from "@/components/ui/badge"

interface FeatureBadgesProps {
  features: string[];
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
}

export function FeatureBadges({ features, selectedFeatures, onFeatureToggle }: FeatureBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((feature:any) => (
        <Badge
          key={feature}
          variant="outline"
          className={`cursor-pointer transition-colors ${
            selectedFeatures.includes(feature?.id) ? 'bg-primary300 text-primary-foreground' : 'bg-background'
          }`}
          onClick={() => onFeatureToggle(feature?.id)}
        >
          {feature?.name}
        </Badge>
      ))}
    </div>
  );
}

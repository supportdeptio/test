import { registerComponent } from '@plasmicapp/host';
import { Button } from "./ui/button";
import { HeroSection } from "./hero-section";

// Register components with Plasmic
registerComponent(Button, {
  name: "Button",
  props: {
    children: "string",
    className: "string",
    variant: {
      type: "choice",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"]
    },
    size: {
      type: "choice",
      options: ["default", "sm", "lg", "icon"]
    }
  },
  importPath: ''
});

registerComponent(HeroSection, {
  name: "HeroSection",
  props: {
    title: "string",
    description: "string",
    ctaText: "string",
    ctaLink: "string",
    className: "string"
  },
  importPath: ''
});

// Export the components for use in Plasmic Studio
export const PLASMIC_COMPONENT_REGISTRY = {
  Button,
  HeroSection
};

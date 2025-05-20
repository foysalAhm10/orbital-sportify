declare module "*.png" {
  const value: any;
  export default value;
}

// An images.d.ts file tells TypeScript how to handle imports for files 
// it doesn't understand by default—like images, CSS, SVGs, etc.

// what this does:
// It tells TypeScript: "Whenever you see an import ending in .png, treat it as a string (the path to the image)."
// This removes TypeScript errors when you write import home from "@/assets/images/icons8-home-96.png";.
// It improves editor support and type safety for image imports.

// Summary:
// It fixes TypeScript errors for image imports by providing type information.
// from Github Copilot
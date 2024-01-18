export function generateRandomColorScheme(): string {
  const colorSchemes = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];

  return colorSchemes[Math.floor(Math.random() * (colorSchemes.length - 1))];
}

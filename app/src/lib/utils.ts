export function bytesToHumanSize(bytes: number) {
  const bases = ['bytes', 'KB', 'MB', 'GB'];
  for (let i = 0; i < bases.length; i++) {
    if (bytes > 1024) {
      bytes /= 1024;
    } else {
      return `${i === 0 ? bytes : bytes.toFixed(2)} ${bases[i]}`;
    }
  }
}

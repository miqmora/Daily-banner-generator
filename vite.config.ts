
import { defineConfig, type Plugin } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

const figmaAssetResolver: Plugin = {
  name: 'figma-asset-resolver',
  resolveId(source) {
    if (source.startsWith('figma:asset/')) {
      const assetPath = source.replace('figma:asset/', '');
      return path.resolve(__dirname, './src/assets', assetPath);
    }
    return null;
  },
};

  export default defineConfig({
  base: '/Daily-banner-generator/',
  plugins: [react(), figmaAssetResolver],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/fec64d940bbef64446a7ec2c5c51131f0583e761.png': path.resolve(__dirname, './src/assets/fec64d940bbef64446a7ec2c5c51131f0583e761.png'),
        'figma:asset/f1515f870d9f5d0768fb40049963ce026a5f5df2.png': path.resolve(__dirname, './src/assets/f1515f870d9f5d0768fb40049963ce026a5f5df2.png'),
        'figma:asset/e61ebb208fc09984591fe280ad9d3184c8e5b57b.png': path.resolve(__dirname, './src/assets/e61ebb208fc09984591fe280ad9d3184c8e5b57b.png'),
        'figma:asset/df7b42583071073738bc8d2e3349bec5963f09c3.png': path.resolve(__dirname, './src/assets/df7b42583071073738bc8d2e3349bec5963f09c3.png'),
        'figma:asset/de410d765335957d4ec5d820149f7fa0ce39b420.png': path.resolve(__dirname, './src/assets/de410d765335957d4ec5d820149f7fa0ce39b420.png'),
        'figma:asset/dad63941d0f84a6e073fd2c877b605c2b790489e.png': path.resolve(__dirname, './src/assets/dad63941d0f84a6e073fd2c877b605c2b790489e.png'),
        'figma:asset/cea96ed9d61215ade2e021ad2c38bc815b0615f7.png': path.resolve(__dirname, './src/assets/cea96ed9d61215ade2e021ad2c38bc815b0615f7.png'),
        'figma:asset/c62c82a2dcec7284908fe9792e28858012b883c3.png': path.resolve(__dirname, './src/assets/c62c82a2dcec7284908fe9792e28858012b883c3.png'),
        'figma:asset/b7451ccb1d15b2ac2a314e6a254ad275d713b4d3.png': path.resolve(__dirname, './src/assets/b7451ccb1d15b2ac2a314e6a254ad275d713b4d3.png'),
        'figma:asset/b3c912e8910f0204ac51dbf51fe48cac295ca503.png': path.resolve(__dirname, './src/assets/b3c912e8910f0204ac51dbf51fe48cac295ca503.png'),
        'figma:asset/b32c42dab0bd0a10bb0fcbc22cb83a30741b4751.png': path.resolve(__dirname, './src/assets/b32c42dab0bd0a10bb0fcbc22cb83a30741b4751.png'),
        'figma:asset/ab1b4d52cb8164d5105857443bff24d778e89622.png': path.resolve(__dirname, './src/assets/ab1b4d52cb8164d5105857443bff24d778e89622.png'),
        'figma:asset/ab0f0072e277b289cd99222e445e76c7c079c397.png': path.resolve(__dirname, './src/assets/ab0f0072e277b289cd99222e445e76c7c079c397.png'),
        'figma:asset/ab0f0072e277b289cd99222e445e76c7c079c397.png': path.resolve(__dirname, './src/assets/ab0f0072e277b289cd99222e445e76c7c079c397.png'),
        'figma:asset/a42774e7f6e53202555d120f2b091ca11dc4ad20.png': path.resolve(__dirname, './src/assets/a42774e7f6e53202555d120f2b091ca11dc4ad20.png'),
        'figma:asset/974bb07434a42998351f7055a3514fd27ca377bd.png': path.resolve(__dirname, './src/assets/974bb07434a42998351f7055a3514fd27ca377bd.png'),
        'figma:asset/928398ccc277eede10f4f40d3adaaa232a730c04.png': path.resolve(__dirname, './src/assets/928398ccc277eede10f4f40d3adaaa232a730c04.png'),
        'figma:asset/8544ed52b457a2e8f3c6441544c8f9a6d1110825.png': path.resolve(__dirname, './src/assets/8544ed52b457a2e8f3c6441544c8f9a6d1110825.png'),
        'figma:asset/8439c35aa60ac0872cf65531990a5d316d4861e5.png': path.resolve(__dirname, './src/assets/8439c35aa60ac0872cf65531990a5d316d4861e5.png'),
        'figma:asset/83175dc93d90b0dcf33be364c18166f42b3a8f71.png': path.resolve(__dirname, './src/assets/83175dc93d90b0dcf33be364c18166f42b3a8f71.png'),
        'figma:asset/703be059895885fdf9302d8e30e4d0153b6e7a8c.png': path.resolve(__dirname, './src/assets/703be059895885fdf9302d8e30e4d0153b6e7a8c.png'),
        'figma:asset/6f67ecd804c8aae0c6bdcb5916d849fc99de12c6.png': path.resolve(__dirname, './src/assets/6f67ecd804c8aae0c6bdcb5916d849fc99de12c6.png'),
        'figma:asset/6f2d93b5eee2c315c471f1bc618e2e424f826088.png': path.resolve(__dirname, './src/assets/6f2d93b5eee2c315c471f1bc618e2e424f826088.png'),
        'figma:asset/60b543cb752016f31314cf0b18063bd68c64cd14.png': path.resolve(__dirname, './src/assets/60b543cb752016f31314cf0b18063bd68c64cd14.png'),
        'figma:asset/5372f12a6cd6df711e858cb97eb8686bc5e94b0e.png': path.resolve(__dirname, './src/assets/5372f12a6cd6df711e858cb97eb8686bc5e94b0e.png'),
        'figma:asset/4c0b5035dfbf59852c815c370a3189544f21e217.png': path.resolve(__dirname, './src/assets/4c0b5035dfbf59852c815c370a3189544f21e217.png'),
        'figma:asset/49293ed7441b10a849171d51c05a7cd85d331ce0.png': path.resolve(__dirname, './src/assets/49293ed7441b10a849171d51c05a7cd85d331ce0.png'),
        'figma:asset/4518f775d1a2868045a387aab1443183675fcb84.png': path.resolve(__dirname, './src/assets/4518f775d1a2868045a387aab1443183675fcb84.png'),
        'figma:asset/290d04561742254da3c532504e097c500143e113.png': path.resolve(__dirname, './src/assets/290d04561742254da3c532504e097c500143e113.png'),
        'figma:asset/1fe9b16076e783edc9ab94cbbea456ad3f4343c0.png': path.resolve(__dirname, './src/assets/1fe9b16076e783edc9ab94cbbea456ad3f4343c0.png'),
        'figma:asset/001dc60c9883346386420e6be483c75b8995b61b.png': path.resolve(__dirname, './src/assets/001dc60c9883346386420e6be483c75b8995b61b.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  });
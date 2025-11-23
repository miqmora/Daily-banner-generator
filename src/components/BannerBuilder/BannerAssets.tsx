import svgPathsShapes from "../../imports/svg-o2u87i0f1b";
import svgPathsWordmark from "../../imports/svg-4vcf8u1y30";
import svgPathsLogo from "../../imports/svg-a88rwixceq";

// Import all images
// Shapes
import imgRectangle435_Shapes from "figma:asset/49293ed7441b10a849171d51c05a7cd85d331ce0.png";
import imgRectangle447 from "figma:asset/001dc60c9883346386420e6be483c75b8995b61b.png";
import imgWordmark_Shapes from "figma:asset/8544ed52b457a2e8f3c6441544c8f9a6d1110825.png";
import imgGrain from "figma:asset/fec64d940bbef64446a7ec2c5c51131f0583e761.png";

// Wordmark
import imgColor_Wordmark from "figma:asset/6f67ecd804c8aae0c6bdcb5916d849fc99de12c6.png";
import imgColor1_Wordmark from "figma:asset/928398ccc277eede10f4f40d3adaaa232a730c04.png";
import imgRectangle435_Wordmark from "figma:asset/a42774e7f6e53202555d120f2b091ca11dc4ad20.png";
import imgWordmarkStickerBlueWhite from "figma:asset/290d04561742254da3c532504e097c500143e113.png";

// Logo
import imgColor_Logo from "figma:asset/4518f775d1a2868045a387aab1443183675fcb84.png";
// imgRectangle435_Wordmark is reused here as imgRectangle435
import imgStickerWordmark from "figma:asset/de410d765335957d4ec5d820149f7fa0ce39b420.png";
import imgGlossySticker00821 from "figma:asset/b32c42dab0bd0a10bb0fcbc22cb83a30741b4751.png";

export const bannerAssets = {
  svg: {
    shapes: svgPathsShapes,
    wordmark: svgPathsWordmark,
    logo: svgPathsLogo,
  },
  images: {
    common: {
      grain: imgGrain,
    },
    shapes: {
      arrowMask: imgRectangle435_Shapes,
      maskGroup: imgRectangle447,
      wordmark: imgWordmark_Shapes,
    },
    wordmark: {
      color1: imgColor_Wordmark,
      color2: imgColor1_Wordmark,
      arrowMask: imgRectangle435_Wordmark,
      sticker: imgWordmarkStickerBlueWhite,
    },
    logo: {
      color: imgColor_Logo,
      arrowMask: imgRectangle435_Wordmark, // Reused
      stickerWordmark: imgStickerWordmark,
      glossySticker: imgGlossySticker00821,
    }
  }
};

import joro from 'joro';

export const DS = {
  fontFamily: {
    default: "Fira Mono, san-serif",
    alt: "'Staatliches', san-serif",
  },
  fontSizes: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,

  },
  gutters: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  colors: {
    purple: "#6D7BC8",
    purple_rgb: "195, 122, 255",
    pink: "#C27DFF",
    green: "#95E6C9",
    orange: "#FB970C",
    yellow: "#D0ECBA",
    black: "#000000",
    white: "#FFFFFF",
    grey: "#DFDFDF",
  }
}

export const STYLES = new joro();


function buttonStyle() {
  return `
  background: ${DS.colors.black};
  color:  ${DS.colors.white};
  box-sizing: border-box;
  border-radius:30px;
  font-size: ${DS.fontSizes.lg}px;
  padding: ${DS.gutters.md}px;
  border: 0;
  text-decoration: none;
  `
}

export function roundButtons(name, size, ftsize, rotate, position, color) {
  return `
  .circle.${name} {
    background: ${DS.colors.white};
    color: ${color};
    height: ${size}px;
    width: ${size}px;
    font-size: ${ftsize}px;
    line-height: ${ftsize}px;
    position: ${position};
    ${position == "absolute" ? `
    top: -10px;
    right: -10px;
    `: ""}
    ${rotate ? `transform: rotate(45deg)` : ""}
  }
  `
}


export function BaseStyles() {
  STYLES.add("baseStyles", `
    html,body {
      margin: 0;
      padding: 0;
      background: ${DS.colors.green};
      color:  ${DS.colors.white};
      opacity: 1;
      background: url(/current-bg.png);
      background-size: cover;
      background-position: top;
      background-attachment: fixed;
      height: 100%;
      scrollbar-color: ${DS.colors.green} transparent;
    }
    h1 {
      font-size: ${DS.fontSizes.lg}px;
      text-align:center;
      display:inline-block;
      width: 100%;
    }
    button {
      display: block;
      clear:both;
      width: 100%;
      margin: ${DS.gutters.sm}px auto ${DS.gutters.sm}px auto;
      ${buttonStyle()}
    }
    .page {
      height:100vh;
    }
    .container {
      height: 50vh;
      float:left;
      width: 100%;
      background-size: cover;
      padding: 20px;
      box-sizing:border-box;
    }
    
    .current {
      background-image: url(/current-bg.png);
      overflow:hidden;
    }
    .inbox {
      background-image:  url(/inbox-bg.png);
      overflow-y:scroll;
      scrollbar-color: ${DS.colors.pink} transparent;

    }
    .hide {
      display:none !important;
    }

    button.circle {
      margin: 0;
      padding: 0;
      border-radius: 100%;
      border: 2px solid;
      display:inline-block;
      position: relative;
      display:inline-block;

    }
    button.circle span {
      margin: 0;
      padding: 0;
      width: 100%;
      position: absolute;
      left: 0px;
      top: -2px;
      height: 100%;
    }
    ${roundButtons('add', 40, 40, false, 'relative', DS.colors.grey)}
    ${roundButtons('close', 20, 20, true, 'absolute', DS.colors.orange)}
    .circle.add {
      margin: 20px auto;
      display:block;
    }
    .circle.close {
      visibility: hidden;
    }
    .ghost {
      background: transparent;
    }
    .ghost.bw {
      filter: grayscale(100%);
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      align-content: center;
    }
    .grid .col {
      display: flex;
      width: 33%;
    }

    .pokemon {
      width: 20vw;
      display:inline-block;
      position: relative;
      margin: 0 auto;
    }
    .pokemon:hover .close {
      visibility: visible;

    }
    .pokemon img {
      width: 100%;
    }
    .pokemon small {
      font-weight: bold;
      color: ${DS.colors.black};
    }
    .ADD_POKEMON {
      padding: 20px;
      box-sizing:border-box;
  
    }
    .ADD_POKEMON > img {
      width: 70%;
      margin: ${DS.gutters.xl}px auto;
      display:block;
    }

    input {
      background: ${DS.colors.white};
      color:  ${DS.colors.black};
      box-sizing: border-box;
      border-radius:30px;
      font-size: ${DS.fontSizes.md}px;
      padding: ${DS.gutters.md}px;
      margin-bottom: ${DS.gutters.sm}px;
      border: 0;
      width: 100%;
      text-decoration: none;
      text-align:center;
    }
    .search {
      position:relative;
      z-index: 5;
    }

    .search + ul {
      padding: 32px 0px 0px 0px;
      background: #fff;
      margin: -40px 0 0 0;
      max-height: 50vh;
      overflow-y: scroll;
      left: 20px;
      border-radius:0px 0px 30px 30px;
      box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
      position:absolute;
      z-index: 4;
      width: 86.6vw;

    }
    .search + ul button {
      background: ${DS.colors.white};
      color: ${DS.colors.black};
    }
    .form {
      display:inline-block;
    }
    .form input {
      width: 50%;
      float:left;
      box-sizing:border-box;
      display:inline-block;
    }
    .form button {
      padding: 8px 0 0 0;
      margin-top: 0px;
      height: 40px;
      display:inline-block;
      border-radius: 8px;
      width:70px;
      box-sizing:border-box;
    }

  `)
}
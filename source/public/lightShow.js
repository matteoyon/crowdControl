let colorCode;
let value;
let firstTime = true;
let r,g,b;

function lightShow(lightScene){
    switch(lightScene) {
        case 0:
            colorCode = color(0,0,0);
            background(colorCode);
            firstTime = true;
            break;
        case 1://Strobo
            colorMode(RGB, 255);
            value = (round(random(0, 1)));

            colorCode.setRed(value*255);
            colorCode.setGreen(value*255);
            colorCode.setBlue(value*255);

            background(colorCode);
            break;
            loopSample
        case 2://blackToWhite
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(0,0,0);
                background(colorCode);
                r = 0;
                g = 0;
                b = 0;
                firstTime = false;
            }else{
                r = lerp(r, 255, 0.2);
                g = r;
                b = r;
                colorCode.setRed(round(r));
                colorCode.setGreen(round(g));
                colorCode.setBlue(round(b));
                background(colorCode);
            }
            break;

        case 3:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(128,0,256);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setRed(128 + 128 * sin(millis() / 1000));
                background(colorCode);
            }
            break;

        case 4:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(0,0,128);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setBlue(128 + 128 * sin(millis() / 1000));
                background(colorCode);
            }
            break;
        case 5:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(170,0,170);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setGreen(128 + 128 * sin(millis() / 1000));
                background(colorCode);
            }
            break;
        case 6:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(0,0,0);
                background(colorCode);
                r = 0;
                g = 0;
                b = 0;
                firstTime = false;
            }else{
                r = lerp(r, 255, 0.02);
                g = r;
                colorCode.setRed(round(r));
                colorCode.setGreen(round(g));
                colorCode.setBlue(round(b));
                background(colorCode);
            }
            break;
        case 7:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(127,255,127);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setBlue(128 + 128 * sin(millis() / 1000));
                colorCode.setRed(128 + 128 * sin(millis() / 1000));
                background(colorCode);
            }
            break;
        case 8:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(127,0,0);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setRed(128 * sin(millis() / 500));
                background(colorCode);
            }
            break;
        case 9:
            colorMode(RGB, 255);
            if (firstTime){
                r=0;
                g=0;
                b=0;
                colorCode = color(0,0,0);
                background(colorCode);
                firstTime = false;
            }else{
                if (r < 255){
                    r+=8;
                }else{
                    g+=8;
                    b+=8;
                }
                colorCode.setRed(r);
                colorCode.setGreen(g);
                colorCode.setBlue(b);
                background(r,g,b);
            }
            break;
        case 10:
            colorMode(RGB, 255);
            if (firstTime){
                colorCode = color(255,255,0);
                background(colorCode);
                firstTime = false;
            }else{
                colorCode.setBlue(255 * sin(millis() / 500));
                background(colorCode);
            }
            break;
        default:
            background(0,0,0);
      }
}
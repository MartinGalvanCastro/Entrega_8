import { IPlaywrightWorld } from "../world";
import fs from "fs";

let stepCounter = 0;

export const tomarPantallazo = async (
  world: IPlaywrightWorld,
  imageName: string,
  folder: string
) => {
  const screenshotPath = `../screenshots/${folder}/${imageName}-${stepCounter}.png`;
  if (!fs.existsSync(`../screenshots/${folder}`)) {
    fs.mkdirSync(`../screenshots/${folder}`, { recursive: true });
  }
  await world.page.screenshot({ path: screenshotPath });
  stepCounter += 1;
};

export const resetCounter = () => {
  stepCounter = 0;
};

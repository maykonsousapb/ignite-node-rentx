import { container } from "tsyringe";

import { DayJsDateProvider } from "./DayJs/DayJsDateProvider";
import { IDateProvider } from "./IDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJsDateProvider);

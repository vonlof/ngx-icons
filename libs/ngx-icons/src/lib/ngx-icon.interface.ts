export interface NgxIcon {
  name: string;
  data: string;
}

export interface NgxIconOptions {
  icons?: Array<NgxIcon>;
  missingIcon?: NgxIcon;
}

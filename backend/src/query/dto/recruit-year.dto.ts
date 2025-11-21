export class RecruitYearResponseDto {
  constructor({
    recruitYear,
    displayName,
    themeColor,
  }: {
    recruitYear: number;
    displayName: string;
    themeColor: string;
  }) {
    this.recruitYear = recruitYear;
    this.displayName = displayName;
    this.themeColor = themeColor;
  }

  recruitYear: number;
  displayName: string;
  themeColor: string;
}

interface JobInterface {
  company: string;
  role: string;
  applied: Date;
  contacted: boolean;
  rejected: boolean;
  oneInterview: boolean;
  moreThanOneInterview: boolean;
  Accepted: boolean;
}

export class Job implements JobInterface {
  company: string;
  role: string;
  applied: Date;
  contacted: boolean;
  rejected: boolean;
  oneInterview: boolean;
  moreThanOneInterview: boolean;
  Accepted: boolean;

  constructor(company: string, role: string, applied: Date, contacted: boolean, rejected: boolean, oneInterview: boolean, moreThanOneInterview: boolean, Accepted: boolean) {
    this.company = company;
    this.role = role;
    this.applied = applied;
    this.contacted = contacted;
    this.rejected = rejected;
    this.oneInterview = oneInterview;
    this.moreThanOneInterview = moreThanOneInterview;
    this.Accepted = Accepted;
  }
}

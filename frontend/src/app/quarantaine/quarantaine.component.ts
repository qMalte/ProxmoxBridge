import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../app.config";
import {catchError, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProxmoxSpamEntry} from "../../../../app/models/Proxmox/SpamEntry";
import {ParsedMail} from "mailparser";
import {QuarantaineAction} from "../../classes/QuarantaineAction";

@Component({
  selector: 'app-quarantaine',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './quarantaine.component.html',
  styleUrl: './quarantaine.component.scss'
})
export class QuarantaineComponent implements OnInit {

  private sub: any;

  identifier?: string;
  secret?: string;

  mails: ProxmoxSpamEntry[] = [];
  selectedMail?: ParsedMail;
  selectedMailId = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.identifier = params['identifier'];
      this.secret = params['secret'];
      this.getQuarantaine();
    });
  }

  getQuarantaine() {
    this.http
      .get<ProxmoxSpamEntry[]>(`${environment.apiUrl}/quarantaine/${this.identifier}/${this.secret}`)
      .pipe(catchError(err => {
        return throwError(err.error?.description_de);
      }))
      .subscribe(response => {
        this.mails = response;
      });
  }

  getMessage(id: string|undefined) {
    if (!id) {
      return;
    }

    this.http
      .get<ParsedMail>(`${environment.apiUrl}/mail/${id}/${this.identifier}/${this.secret}`)
      .pipe(catchError(err => {
        return throwError(err);
      }))
      .subscribe(async (response: ParsedMail) => {
        this.selectedMail = response;
        this.selectedMailId = id;
      });
  }

  performMessageAction(id: string|undefined, action:  QuarantaineAction) {
    if (!id) {
      return;
    }

    this.http
      .post(`${environment.apiUrl}/quarantaine/mail`, {
        mailId: id,
        identifier: this.identifier,
        secret: this.secret,
        action
      })
      .pipe(catchError(err => {
        return throwError(err);
      }))
      .subscribe(() => {
        this.selectedMail = undefined;
      });
  }

  get isSigned(): boolean {
    return this.selectedMail != null
      && this.selectedMail?.attachments?.length > 0
      && this.selectedMail?.attachments
        .find(x => x.contentType.toLowerCase() === 'application/pkcs7-signature') != null;
  }

  get recipients(): string {
    if (this.selectedMail != null) {
      const to = this.selectedMail.to;
      if (Array.isArray(to)) {
        return to.map(x => x.value).join(', ');
      } else if (to?.text != null) {
        return to.text;
      }
    }
    return '';
  }

  get from(): string {
    if (this.selectedMail != null) {
      const from = this.selectedMail.from;
      if (Array.isArray(from)) {
        return from.map(x => x.value).join(', ');
      } else if (from?.text != null) {
        return from.text;
      }
    }
    return '';
  }

  get QuarantaineAction() {
    return QuarantaineAction;
  }

}

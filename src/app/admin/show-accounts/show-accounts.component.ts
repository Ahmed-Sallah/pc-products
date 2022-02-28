import { Component, OnInit } from '@angular/core';
import { Account } from '../account.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-show-accounts',
  templateUrl: './show-accounts.component.html',
  styleUrls: ['./show-accounts.component.css']
})
export class ShowAccountsComponent implements OnInit {

  accounts: Account[]
  search =''
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAccounts()
    this.adminService.getAccountsUpdateListener()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts
      })
  }

  onDeleteAccount(accId: string) {
    this.adminService.deleteAccount(accId)
  }

}

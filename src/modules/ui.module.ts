import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { UiAuthModule } from './ui-auth/ui-auth.module';

const routes: Routes = [
  {
    path: 'ui',
    children: [
      {
        path: 'auth',
        module: UiAuthModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), UiAuthModule, UserModule],
})
export class UiModule {}

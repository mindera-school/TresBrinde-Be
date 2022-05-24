import {SetMetadata} from '@nestjs/common';

export const IS_SAME_USER_KEY = 'isSameUser';
export const IsSameUser = (...data) => SetMetadata(IS_SAME_USER_KEY, data);
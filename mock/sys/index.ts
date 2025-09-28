import { MockMethod } from 'vite-plugin-mock';
import {  resultSuccess, requestParams } from '../_util'

export default [
  {
    url: '/webapi/api/login',
    method: 'post',
		response: (_request: requestParams) => {
      const data = {
				author: 'Janaeiw',
				avatar: '/images/avatar.jpg',
				projectAddress: 'https://github.com/Janaeiw/vue3-vite2-h5-template-ynzy'
			}
			return resultSuccess(data)
    },
  },
] as unknown as MockMethod[];

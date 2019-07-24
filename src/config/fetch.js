import {
	baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch',noBase=false) => {
	type = type.toUpperCase();
	if (noBase) {
		url = url;
	} else {
		url = baseUrl + url;
	}
	console.log("url="+url)
	console.log("type="+type)

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		console.log("url11="+url);
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
			console.log("requestConfig=="+JSON.stringify(requestConfig))
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			// const responseJson = await response.text();
			//const responseJson = await response;
			console.log("responseJson=="+JSON.stringify(responseJson))
			return responseJson
		} catch (error) {
			console.log("error=="+JSON.stringify(error))
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}

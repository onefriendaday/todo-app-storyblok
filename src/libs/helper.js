let slugify = require('slugify')
const _ = require('underscore')

slugify.extend({ '.': '-' })
slugify.extend({ ':': '-' })

const helper = {
  slugify: slugify,
  sortAlphabetically: (array, key) => {
    if (!_.isArray(array)) {
      return []
    }
    return array.sort((a, b) => {
      var a = a[key] ? a[key].toLowerCase() : a[key]
      var b = b[key] ? b[key].toLowerCase() : b[key]
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  },
  isUrl: (string) => {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(string);
  },
  responseErrorHandler: (error) => {
    var message = ''
    console.log('Error', error)

    if (typeof error.status != 'undefined' &&
      error.status == 401) {
      window.location.href = '#!/'
    }

    if (!_.isEmpty(error.data) && (_.isObject(error.data) || _.isArray(error.data))) {
      _.each(error.data, function(errorMessage, key){
        message = message + '<li>' + key.toUpperCase() + ' ' + errorMessage + '</li>'
      })
    }

    if (typeof error.message != 'undefined') {
      message = error.message
    }

    if (typeof error == 'string') {
      message = error
    }

    if (_.isEmpty(message)) {
      message = 'Something went wrong.'
    }

    UIkit.notify.closeAll();
    UIkit.notify('<ul class="uk-list uk-margin-bottom-remove">' + message + '</ul>', {status: 'danger', timeout: 2000})
  },
  notify: (message, status) => {
    UIkit.notify(message, { status: status })
    console.log('Notify: ', message, status)
  }
}

export { helper }

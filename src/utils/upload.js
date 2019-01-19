import COS from 'cos-js-sdk-v5';

let COSObject = new COS({
  SecretId: 'AKIDomlnpkwPyLaOEvCAnEj9PZyKVsFSnWYQ',
  SecretKey: '2ykMwRq4BEUegYGpDRWaVJh0AA91jHj1'
});

/**
 * 上传文件到腾讯
 * @param object
 * @param key
 * @param fileType
 * @returns {Promise<any>}
 */
function saveToCOS(object, key = 'testbase64', fileType = '.jpg') {

  return new Promise((resolve, reject) => {
    COSObject.putObject({
      Bucket: 'wewechat-1252599784',
      Region: 'ap-guangzhou',
      Key: key + fileType,
      Body: object
    }, function(err, data) {
      console.info('err', err);
      console.info('data', data);
      if (err && err.length) {
        console.error(err.toString() || '上传失败')
        reject(err)
      } else {
        if (data && data.Location && data.Location.length) {
          resolve(data.Location);
        }
      }
    });
  })
}
export default saveToCOS;

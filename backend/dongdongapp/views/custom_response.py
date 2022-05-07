class Util():
    def response(data,status,success):
        return {
            "result":data,
            "status":status,
            "success":success
        }
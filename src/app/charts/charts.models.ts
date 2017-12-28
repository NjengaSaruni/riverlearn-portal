/**
 * Created by saruni on 12/27/17.
 */

class Chart {
  id: String;
  data: Object;
  height: any;
  width: any;
  constructor(config: Object) {
    this.id = config['id'];
    this.data = config['data'];
    this.height = config['height'] || 300;
    this.width = config['width'] || 600;
  }
}

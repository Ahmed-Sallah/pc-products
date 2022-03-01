const mongoose = require('mongoose')
const Component = require('../models/product')

mongoose.connect('mongodb://localhost:27017/pc-components')
  .then(() => {
    console.log('DATABASE CONNECTED')
  })
  .catch(err => {
    console.log('CONNECTION FAILED')
    console.log(err)
})

const motherboardData = async () => {
  await Component.deleteMany({type: 'motherboards'})
  const motherboard1 = new Component({type: 'motherboards', name: 'Asrock B550 Pro4', price: 2900, brand: 'Asrock', image: 'https://www.asrock.com/mb/photo/B550%20Pro4(M1).png', availability: true})
  const motherboard2 = new Component({type: 'motherboards', name: 'ASUS B450M TUF GAMING PRO S AI Noise-Canceling Micro ATX Gaming Motherboard', price: 1950, brand: 'Asus', image: 'https://m.media-amazon.com/images/I/71RBbq9QDPS.jpg', availability: false})
  const motherboard3 = new Component({type: 'motherboards', name: 'Gigabyte A320M-S2H', price: 1150, brand: 'Gigabyte', image: 'https://cdn.elbadrgroupeg.store/image/cache/catalog/13-145-054-V05-1280x960.jpg', availability: true})
  const motherboard4 = new Component({type: 'motherboards', name: 'MSI B450 GAMING PLUS MAX', price: 1850, brand: 'MSI', image: 'https://www.elnekhelytechnology.com/image/cache/catalog/Motherboards/MSI/msi-b460m-a-pro-1000x1000.png', availability: false})
  const motherboard5 = new Component({type: 'motherboards', name: 'GIGABYTE A520 AORUS ELITE', price: 1999 , brand: 'Gigabyte', image: 'https://static.gigabyte.com/StaticFile/Image/Global/4015917ad62b61e3c58a14232d4b46ba/Product/25806/png/1000', availability: true})
  await motherboard1.save()
  await motherboard2.save()
  await motherboard3.save()
  await motherboard4.save()
  await motherboard5.save()
}

const cpuData = async () => {
  await Component.deleteMany({type: 'cpu'})
  const cpu1 = new Component({type: 'cpu', name: 'AMD RYZEN 5 2600 6-Core 12-Threads (Max Boost 3.9 GHz)', price: 2350, brand: 'Amd', image: 'https://cdn.elbadrgroupeg.store/image/cache/catalog/19-113-496-V01-1280x960.jpg', availability: true})
  const cpu2 = new Component({type: 'cpu', name: 'AMD RYZEN 3 3100 4-Core 8-Thread (Max Boost 3.9 GHz)', price: 1900, brand: 'Amd', image: 'https://highendstore.net/image/cache/catalog/RYZEN_3_LEFT-1384x1188.png', availability: false})
  const cpu3 = new Component({type: 'cpu', name: 'Intel Core I5-10600 Comet Lake 6-Core 12-Thread (4.8 GHz Turbo)', price: 4000, brand: 'Intel', image: 'https://elyamamastore.com/images/thumbs/000/0002069_intel-core-i5-10600-comet-lake-6-core-33-ghz-lga-1200-65w-desktop-processor-bx8070110600_625.jpeg', availability: true})
  const cpu4 = new Component({type: 'cpu', name: 'Intel Core I7-11700F Rocket Lake 8-Cores 16-Threads (4.9 GHz Turbo)', price: 6700, brand: 'Intel', image: 'https://img-cdn-aws.gputracker.eu/fit-in/500x500/products/503/2037/5032037215572.png?signature=da2b4e13f80b909addd4b45a5ae93dcc7401ec1f3188fa484de1ebe3f8b763e1', availability: false})
  const cpu5 = new Component({type: 'cpu', name: 'Intel Core™ I9-12900K Processor 16 Cores / 24 Threads (30M Cache, Up To 5.20 GHz)', price: 12000 , brand: 'Intel', image: 'https://m.media-amazon.com/images/I/61RnzuOIOoL._AC_SL1002_.jpg', availability: true})
  await cpu1.save()
  await cpu2.save()
  await cpu3.save()
  await cpu4.save()
  await cpu5.save()
}

const ramData = async () => {
  await Component.deleteMany({type: 'ram'})
  const ram1 = new Component({type: 'ram', name: 'Corsair DOMINATOR PLATINUM RGB 16GB (2x8GB) DDR4 3200MHz C16 Memory Kit Black', price: 2500, brand: 'Corsair', image: 'https://m.media-amazon.com/images/I/61phjjKKrmL._AC_SS450_.jpg', availability: true})
  const ram2 = new Component({type: 'ram', name: 'Crucial Ballistix 16GB (2x8GB) 3600 CL:16 Black Gaming Memory', price: 1700, brand: 'Crucial', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-164-173-01.jpg', availability: false})
  const ram3 = new Component({type: 'ram', name: 'Gigabyte Aorus RGB 16GB (2x8) DDR4 3600 CL18 1.35V', price: 2250, brand: 'Gigabyte', image: 'https://maximumhardware.store/image/cache/catalog/Aorus/1000-1-1000x1000.png', availability: true})
  const ram4 = new Component({type: 'ram', name: 'Kingston FURY Beast DDR5 Memory 16GB 4800Mhz CL38', price: 2750, brand: 'Kingstone', image: 'https://media.ldlc.com/r1600/ld/products/00/05/90/13/LD0005901304_1.jpg', availability: false})
  const ram5 = new Component({type: 'ram', name: 'Team T-FORCE DARK Z 32GB DDR4 3200 CL16 Gaming Memory', price: 3900 , brand: 'Team Group', image: 'https://www.teamgroupinc.com/en/upload/product_color_b/3cb1f98bd47e2a66223bf5c105ea6f9c-20190820180616.jpg', availability: true})
  const ram6 = new Component({type: 'ram', name: 'Team T-FORCE DARK Z 32GB DDR4 3200 CL16 Gaming Memory', price: 3900 , brand: 'Team Group', image: 'https://www.teamgroupinc.com/en/upload/product_color_b/3cb1f98bd47e2a66223bf5c105ea6f9c-20190820180616.jpg', availability: true})
  const ram7 = new Component({type: 'ram', name: 'Team T-FORCE DARK Z 32GB DDR4 3200 CL16 Gaming Memory', price: 3900 , brand: 'Team Group', image: 'https://www.teamgroupinc.com/en/upload/product_color_b/3cb1f98bd47e2a66223bf5c105ea6f9c-20190820180616.jpg', availability: true})
  const ram8 = new Component({type: 'ram', name: 'Team T-FORCE DARK Z 32GB DDR4 3200 CL16 Gaming Memory', price: 3900 , brand: 'Team Group', image: 'https://www.teamgroupinc.com/en/upload/product_color_b/3cb1f98bd47e2a66223bf5c105ea6f9c-20190820180616.jpg', availability: true})
  await ram1.save()
  await ram2.save()
  await ram3.save()
  await ram4.save()
  await ram5.save()
  await ram6.save()
  await ram7.save()
  await ram8.save()
}

const ssdData = async () => {
  await Component.deleteMany({type: 'ssd'})
  const ssd1 = new Component({type: 'ssd', name: 'Corsair FORCE MP300 480GB NVMe M.2 Up To 1600MBps', price: 1500, brand: 'Corsair', image: 'https://microless.com/cdn/products/d88e0e526261d4828d6c6182892669b4-hi.jpg', availability: true})
  const ssd2 = new Component({type: 'ssd', name: 'Crucial BX500 120GB 3D NAND 2.5 Inch Sata SSD', price: 400, brand: 'Crucial', image: 'https://jomlty.com/wp-content/uploads/2020/05/CT120BX500SSD1dfrer.webp_.png', availability: false})
  const ssd3 = new Component({type: 'ssd', name: 'GIGABYTE 1TB Sata 2.5 Inch SSD', price: 1750, brand: 'Gigabyte', image: 'https://cdn.elbadrgroupeg.store/image/cache/catalog/61Z+EiXq4mL._SL1000_-1000x700.jpg', availability: true})
  const ssd4 = new Component({type: 'ssd', name: 'Samsung 870 EVO 250GB Sata 2.5 Inch SSD', price: 900, brand: 'Samsung', image: 'https://cdn.elbadrgroupeg.store/image/cache/catalog/Samsung/ADqEVa36ZZfZnZv7uEhIFyo2OvdJJ9uFFwB9vmM-1280x960.jpg', availability: false})
  await ssd1.save()
  await ssd2.save()
  await ssd3.save()
  await ssd4.save()
}

cpuData()
  .then(() => {
    mongoose.connection.close()
  })

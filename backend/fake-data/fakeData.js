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
  Component.deleteMany({type: 'motherboard'})
  const motherboard1 = new Component({type: 'motherboards', name: 'Asrock B550 Pro4', price: 2900, brand: 'Asrock', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.asrock.com%2Fmb%2FAMD%2FB550%2520Pro4%2Findex.asp&psig=AOvVaw2X9yzbi8iDhuG8Wox2IGvd&ust=1645306178872000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCP_6OZivYCFQAAAAAdAAAAABAD', availability: true})
  const motherboard2 = new Component({type: 'motherboards', name: 'ASUS B450M TUF GAMING PRO S AI Noise-Canceling Micro ATX Gaming Motherboard', price: 1950, brand: 'Asus', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.eg%2F-%2Fen%2FASUS-Gaming-B450M-PRO-Flashback-Noise-Canceling%2Fdp%2FB098V2CHW8&psig=AOvVaw0iHAZCKefjquB7UwYMT7V_&ust=1645306450807000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjR0qWaivYCFQAAAAAdAAAAABAI', availability: false})
  const motherboard3 = new Component({type: 'motherboards', name: 'Gigabyte A320M-S2H', price: 1150, brand: 'Gigabyte', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felbadrgroupeg.store%2Fgigabyte-a320m-s2h-am4-amd&psig=AOvVaw3NsTdx888Ef083zqB9oDcX&ust=1645306512271000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjrrsOaivYCFQAAAAAdAAAAABAD', availability: true})
  const motherboard4 = new Component({type: 'motherboards', name: 'MSI B450 GAMING PLUS MAX', price: 1850, brand: 'MSI', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elnekhelytechnology.com%2Fmotherboards%2Fmsi-b450-gaming-plus-max&psig=AOvVaw06eTZu_Ea9v9Z8oieLhoxU&ust=1645306551663000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjI2N-aivYCFQAAAAAdAAAAABAD', availability: false})
  const motherboard5 = new Component({type: 'motherboards', name: 'GIGABYTE A520 AORUS ELITE', price: 1999 , brand: 'Gigabyte', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felbadrgroupeg.store%2Fgigabyte-aorus-a520-aorus-elite-am4-amd-a520-sata-6gb-s-atx-amd-motherboard&psig=AOvVaw3XfLF5GYD3aB3eoBozKRSJ&ust=1645306696919000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOi8i5ubivYCFQAAAAAdAAAAABAK', availability: true})
  await motherboard1.save()
  await motherboard2.save()
  await motherboard3.save()
  await motherboard4.save()
  await motherboard5.save()
}

const cpuData = async () => {
  const cpu1 = new Component({type: 'cpu', name: 'AMD RYZEN 5 2600 6-Core 12-Threads (Max Boost 3.9 GHz)', price: 2350, brand: 'AMD', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felbadrgroupeg.store%2Famd-ryzen-5-2600-6-core-3-4-ghz-3-9-ghz-max-boost-socket-am4-65w-yd2600bbafbox-desktop-processor&psig=AOvVaw0qeD_r66oayLVEAdYQJ4Sw&ust=1645307018257000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICByMGcivYCFQAAAAAdAAAAABAD', availability: true})
  const cpu2 = new Component({type: 'cpu', name: 'AMD RYZEN 3 3100 4-Core 8-Thread (Max Boost 3.9 GHz)', price: 1900, brand: 'AMD', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhighendstore.net%2Findex.php%3Froute%3Dproduct%2Fproduct%26product_id%3D768&psig=AOvVaw0U9MqaBMe7c2Vyy7epzuWP&ust=1645307135179000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPifgO2civYCFQAAAAAdAAAAABAD', availability: false})
  const cpu3 = new Component({type: 'cpu', name: 'Intel Core I5-10600 Comet Lake 6-Core 12-Thread (4.8 GHz Turbo)', price: 4000, brand: 'Intel', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felyamamastore.com%2Fen%2Fintel-core-i5-10600-comet-lake-6-core-33-ghz-lga-1200-65w-desktop-processor-bx8070110600&psig=AOvVaw3GZrz12bMM3nmpbSSc23Sd&ust=1645307221501000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLi8tJedivYCFQAAAAAdAAAAABAV', availability: true})
  const cpu4 = new Component({type: 'cpu', name: 'Intel Core I7-11700F Rocket Lake 8-Cores 16-Threads (4.9 GHz Turbo)', price: 6700, brand: 'Intel', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fetasawaq.com%2Far%2Fproduct%2Fintel-core-i7-11700f-rocket-lake-8-cores-up-to-4-9-ghz-16mb%2F&psig=AOvVaw2aGIZQRAX4dXsUGX3gdu_u&ust=1645307290866000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJinm7qdivYCFQAAAAAdAAAAABAT', availability: false})
  const cpu5 = new Component({type: 'cpu', name: 'Elnekhely Technology Intel Core™ I9-12900K Processor 16 Cores / 24 Threads (30M Cache, Up To 5.20 GHz)', price: 12000 , brand: 'Intel', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newegg.com%2Fintel-core-i9-12900kf-core-i9-12th-gen%2Fp%2FN82E16819118341&psig=AOvVaw20qduPT6pbW3_BooMq3Gb7&ust=1645307371371000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNDC8uKdivYCFQAAAAAdAAAAABAD', availability: true})
  await cpu1.save()
  await cpu2.save()
  await cpu3.save()
  await cpu4.save()
  await cpu5.save()
}

const ramData = async () => {
  const ram1 = new Component({type: 'ram', name: 'Corsair DOMINATOR PLATINUM RGB 16GB (2x8GB) DDR4 3200MHz C16 Memory Kit Black', price: 2500, brand: 'Corsair', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FCorsair-Dominator-Platinum-PC4-25600-Optimized%2Fdp%2FB07N3HHLN1&psig=AOvVaw2Ge6eHEuk-VV6eQHdei61d&ust=1645307749759000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODJspifivYCFQAAAAAdAAAAABAd', availability: true})
  const ram2 = new Component({type: 'ram', name: 'Crucial Ballistix 16GB (2x8GB) 3600 CL:16 Black Gaming Memory', price: 1700, brand: 'Crucial', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newegg.com%2Fballistix-16gb-288-pin-ddr4-sdram%2Fp%2FN82E16820164173&psig=AOvVaw0JblHaHsgR0s86eoItM_Rq&ust=1645307892453000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjuqtafivYCFQAAAAAdAAAAABAD', availability: false})
  const ram3 = new Component({type: 'ram', name: 'Gigabyte Aorus RGB 16GB (2x8) DDR4 3600 CL18 1.35V', price: 2250, brand: 'Gigabyte', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.co.uk%2FGIGABYTE-288-Pin-PC4-28800-Platforms-GP-AR36C18S8K2HU416RD%2Fdp%2FB08392PJ6B&psig=AOvVaw1seQEk6-quU4u6dHTnT7vz&ust=1645307948053000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDq-u-fivYCFQAAAAAdAAAAABAI', availability: true})
  const ram4 = new Component({type: 'ram', name: 'Kingston FURY Beast DDR5 Memory 16GB 4800Mhz CL38', price: 2750, brand: 'Kingstone', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elnekhelytechnology.com%2Findex.php%3Froute%3Dproduct%2Fcategory%26path%3D75%26page%3D3&psig=AOvVaw3GI7jYUdTfSxwxrZutcyUe&ust=1645308018475000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiE_JGgivYCFQAAAAAdAAAAABAD', availability: false})
  const ram5 = new Component({type: 'ram', name: 'Team T-FORCE DARK Z 32GB DDR4 3200 CL16 Gaming Memory', price: 3900 , brand: 'Team Group', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.ph%2FTeam-Group-T-Force-DARK-Z-DDR4-GAMING-MEMORY-3200-MHZ-32gb-Kit-2x16-CL16-18-18-38-RAM-i.79692213.5756033703&psig=AOvVaw2vz3ZVEny_yTQsneIshYTU&ust=1645308096957000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIiiwbigivYCFQAAAAAdAAAAABAD', availability: true})
  await ram1.save()
  await ram2.save()
  await ram3.save()
  await ram4.save()
  await ram5.save()
}
const ssdData = async () => {
  const ram1 = new Component({type: 'ssd', name: 'Corsair FORCE MP300 480GB NVMe M.2 Up To 1600MBps', price: 1500, brand: 'Corsair', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuae.microless.com%2Far%2Fproduct%2Fcorsair-force-series-mp300-480gb-nvme-pcie-m-2-ssd-high-speed-nvme-pci-express-gen-3-x2-interface-for-speeds-up-to-1600mb-sec-3x-faster-6gbps-mp300-480gb%2F&psig=AOvVaw00pOSUQljWvYxpl00mLOOM&ust=1645366129100000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiOkOKGjPYCFQAAAAAdAAAAABAD', availability: true})
  const ram2 = new Component({type: 'ssd', name: 'Crucial BX500 120GB 3D NAND 2.5 Inch Sata SSD', price: 400, brand: 'Crucial', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fjomlty.com%2Fproduct%2Fcrucial-bx500-120gb-3d-nand-sata-2-5-inch-ssd%2F&psig=AOvVaw3ijpOxgdGymEa7nIn7PHiA&ust=1645369976912000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDHkIiHjPYCFQAAAAAdAAAAABAN', availability: false})
  const ram3 = new Component({type: 'ssd', name: 'GIGABYTE 1TB Sata 2.5 Inch SSD', price: 1750, brand: 'Gigabyte', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felbadrgroupeg.store%2Fgigabyte-ssd-1tb-nand-flash-sata-iii-2-5-internal-solid-state-drive-gp-gstfs31100tntd&psig=AOvVaw2P2Osxyk5Zx8kE8l9mLR_z&ust=1645370065133000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjo76SHjPYCFQAAAAAdAAAAABAD', availability: true})
  const ram4 = new Component({type: 'ssd', name: 'Samsung 870 EVO 250GB Sata 2.5 Inch SSD', price: 900, brand: 'Samsung', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Felbadrgroupeg.store%2Fsamsung-870-evo-series-2-5-250gb-sata-iii-v-nand-internal-solid-state-drive-ssd-mz-77e250b-am&psig=AOvVaw3v6fLlabHGwhaUFCnBG5jd&ust=1645370131815000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDE8cSHjPYCFQAAAAAdAAAAABAD', availability: false})
  await ram1.save()
  await ram2.save()
  await ram3.save()
  await ram4.save()
}

motherboardData()
  .then(() => {
    mongoose.connection.close()
  })

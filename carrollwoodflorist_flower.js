
const axios = require('axios');
const cheerio = require('cheerio');
const json2csv = require('json2csv');
const fs = require('fs');
const { url } = require('inspector');


scrapedData = []

async function flower_scraper(){
    for (let p = 1; p < 4; p++){
        const url = `https://www.carrollwoodflorist.com/shop-flowers/all-occasions/?ccm_paging_p_b715=${p}`;
        base_url = 'https://www.carrollwoodflorist.com';

        const response = await axios(url);
    
        const data = response.data;
        
        const $ = cheerio.load(data);
        
        
        $('.ccm-core-commerce-product-property-list').each((index, e) =>{
            const product_name = $(e).find('p.f20_product_name a').text();
            const link = $(e).find('p.f20_product_name a').attr('href');
            const product_price = $(e).find('div.f20_price_container').text();
            const product_link = base_url + link;
        
            scrapedData.push({
                product_name,
                product_price,
                product_link
            })
                
        })

    }
    csv = json2csv.parse(scrapedData);
    fs.writeFileSync('carrollwoodflorist_flower.csv', csv)
    console.log(csv);

}

flower_scraper();
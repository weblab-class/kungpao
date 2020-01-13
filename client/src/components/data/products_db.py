import csv


ALL_DATA = dict()

class Product: 
    def __init__(self, category, name, brand, price, st, sc, clean, img):
        self.category = category #category of product: String
        self.name = name #name of product: String
        self.brand = brand #brand of product: String
        self.price = price #price of product: Float
        self.st = st #skin types of product: list of Strings
        self.sc = sc #skin concerns of product: list of Strings
        self.clean = clean #is product clean skincare: String
        self.img = img #filepath to image file or None: String
    

#parsing oil-based cleansers
ALL_DATA['O_CLEANSERS'] = []
with open('o_cleansers.tsv') as o_cleansers:
    reader = csv.reader(o_cleansers, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['O_CLEANSERS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing cleansers
ALL_DATA['WB_CLEANSERS'] = []
with open('wb_cleansers.tsv') as wb_cleansers:
    reader = csv.reader(wb_cleansers, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['WB_CLEANSERS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing exfoliators
ALL_DATA['EXFOLIATORS'] = []
with open('exfoliators.tsv') as exfoliators:
    reader = csv.reader(exfoliators, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['EXFOLIATORS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing toners
ALL_DATA['TONERS'] = []
with open('toners.tsv') as toners:
    reader = csv.reader(toners, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['TONERS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing essences
ALL_DATA['ESSENCES'] = []
with open('essences.tsv') as essences:
    reader = csv.reader(essences, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['ESSENCES'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing serums
ALL_DATA['SERUMS'] = []
with open('serums.tsv') as serums:
    reader = csv.reader(serums, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['SERUMS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing eyecreams
ALL_DATA['EYECREAMS'] = []
with open('eyecreams.tsv') as ec:
    reader = csv.reader(ec, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['EYECREAMS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing moisturizers
ALL_DATA['MOISTURIZERS'] = []
with open('moisturizers.tsv') as moisturizers:
    reader = csv.reader(moisturizers, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['MOISTURIZERS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing masks
ALL_DATA['MASKS'] = []
with open('masks.tsv') as masks:
    reader = csv.reader(masks, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['MASKS'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))

#parsing suncare
ALL_DATA['SUNCARE'] = []
with open('sun.tsv') as s:
    reader = csv.reader(s, delimiter='\t')
    for row in reader:
        if row[0] == 'Product Name': #skip the title line
            continue
        else:
            ALL_DATA['SUNCARE'].append(Product(row[3], row[0], row[1], row[2], row[4], row[5], row[6], row[7]))


print(ALL_DATA['MOISTURIZERS'][11].name)
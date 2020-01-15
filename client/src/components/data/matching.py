import products_db

pref = dict()

pref['type'] = 'Normal'
pref['concerns'] = ['Acne', 'Dullness & Uneven Texture']
pref['length'] = 3
pref['budget'] = 200
pref['favorite brands'] = None
pref['clean'] = 'DC'
pref['own'] = []


data = products_db.create_data()

def create_routine(inp, data):
    if pref['length'] == 3:
        for m in data['MOISTURIZERS']:
            concerns = m.sc.split(',')
            print(concerns)


create_routine(pref, data)

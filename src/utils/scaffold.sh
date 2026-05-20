pwd=`pwd`

for i in services components css data-storage entities
do
    mkdir "${pwd}/${i}"
done

mv *.module.css css
mv *.tsx components

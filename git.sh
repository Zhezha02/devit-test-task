# Создаю папку для проекта и перехожу в нее
mkdir my_repo
cd my_repo

# Клонирую себе репозиторий
git clone git@example.com:example/test.git

# Переключаюсь на ветку dev
git switch dev

# Через cat необходимый текст перевожу и создаю (так как файла не было до этого)  Readme.md 
cat >> Readme.md
### May be in future 

# Добавляю файл Readme.md в отслеживаемые
git add Readme.md

# Создаю коммит с созданным файлом, используя флаш -m для того чтоб сразу ввести название коммита
git commit -m "Add Readme.md"

# Заливаю изменения на удаленный репозиторий в ветку dev из нашего репозитория, который по уполчанию назван origin
git push origin dev
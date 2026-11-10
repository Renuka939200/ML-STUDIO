
FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y python3 python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install

COPY requirements.txt ./

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "start"]

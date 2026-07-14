import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API routes
app.post("/api/gemini/daily-tip", async (req, res) => {
  try {
    const { total, topCategory } = req.body;
    let prompt = `أنت خبير في الاستدامة البيئية. اكتب نصيحة واحدة قصيرة جداً ومباشرة (جملة واحدة أو سطر واحد فقط) لتشجيع المستخدم على تقليل بصمته الكربونية اليوم.`;
    
    if (total) {
      prompt += ` علماً بأن البصمة الكربونية المقدرة للمستخدم هي ${total} كجم شهرياً.`;
      if (topCategory === 'flight') prompt += ` وأكثر انبعاثاته تأتي من السفر الجوي. وجه النصيحة للتقليل من ذلك.`;
      else if (topCategory === 'car') prompt += ` وأكثر انبعاثاته تأتي من قيادة السيارة. وجه النصيحة للتقليل من ذلك.`;
      else if (topCategory === 'electricity') prompt += ` وأكثر انبعاثاته تأتي من استهلاك الكهرباء. وجه النصيحة للتقليل من ذلك.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ tip: response.text });
  } catch (error) {
    console.error("Gemini API error (daily tip):", error);
    res.status(500).json({ error: "فشل في الحصول على نصيحة اليوم." });
  }
});

app.post("/api/gemini/tips", async (req, res) => {
  try {
    const { electricity, carType, kmDriven, flights, total } = req.body;
    
    const prompt = `أنت خبير بيئي ومتخصص في الاستدامة. قام المستخدم بإدخال بياناته في حاسبة البصمة الكربونية:
- استهلاك الكهرباء: ${electricity} كيلوواط/ساعة شهرياً
- نوع السيارة: ${carType === 'petrol' ? 'بنزين' : carType === 'hybrid' ? 'هجين' : 'كهربائي'}
- المسافة المقطوعة بالسيارة: ${kmDriven} كم شهرياً
- عدد رحلات الطيران السنوية: ${flights} رحلة
- إجمالي الانبعاثات الكربونية الشهرية المقدرة: ${total} كجم CO2

قدم نصائح شخصية، قصيرة وعملية ومباشرة (في نقاط مختصرة جداً) لمساعدة المستخدم على تقليل بصمته الكربونية بناءً على هذه الأرقام المحددة. ركز على أكثر الجوانب استهلاكاً لديه. استخدم لغة تحفيزية، واطبع النتيجة بتنسيق Markdown. لا تطل في المقدمات أو الخواتيم.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ tips: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "فشل في الحصول على نصائح من الذكاء الاصطناعي." });
  }
});

app.post("/api/gemini/report", async (req, res) => {
  try {
    const { electricity, carType, kmDriven, flights, total, breakdowns } = req.body;
    
    const prompt = `أنت خبير بيئي ومتخصص في تقارير الاستدامة. قم بإعداد "تقرير البصمة الكربونية الشهري" للمستخدم بناءً على هذه البيانات:
- استهلاك الكهرباء: ${electricity} كيلوواط/ساعة شهرياً
- نوع السيارة: ${carType === 'petrol' ? 'بنزين' : carType === 'hybrid' ? 'هجين' : 'كهربائي'}
- المسافة المقطوعة بالسيارة: ${kmDriven} كم شهرياً
- عدد رحلات الطيران السنوية: ${flights} رحلة
- إجمالي الانبعاثات: ${total} كجم CO2 شهرياً
- تفصيل الانبعاثات: ${breakdowns.electricityCo2} للكهرباء، ${breakdowns.carCo2} للنقل، ${breakdowns.flightCo2} للطيران.

قم بكتابة التقرير بتنسيق Markdown بشكل منظم وجذاب يتضمن:
1. مقدمة تشجيعية موجزة.
2. تحليل مبسط لأكبر مصدر للانبعاثات لدى المستخدم.
3. خطة عمل من 3 نقاط (نصائح قابلة للتطبيق فوراً) مخصصة لحالته.
4. خاتمة ملهمة.
تجنب المقدمات الطويلة واجعل التقرير عملياً وواضحاً ومناسباً للطباعة.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ report: response.text });
  } catch (error) {
    console.error("Gemini API error (report):", error);
    res.status(500).json({ error: "فشل في توليد التقرير." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

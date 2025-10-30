// API Service - Replace mock functions with actual API calls in production

const API = {
    async login(email, password, role) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email && password) {
        return {
          id: Math.random().toString(36).substr(2, 9),
          email,
          role,
          name: role === 'farmer' ? 'John Kamau' : 'Sarah Wanjiku'
        };
      }
      throw new Error('Invalid credentials');
    },
  
    async register(data) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...data
      };
    },
  
    async getWeatherData(location) {
      // TODO: In production, integrate with OpenWeatherMap or similar API
      // Example: 
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`);
      // const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        rainfall: (Math.random() * 200 + 800).toFixed(2),
        temperature: (Math.random() * 10 + 20).toFixed(2),
        ndvi: (Math.random() * 0.3 + 0.6).toFixed(3)
      };
    },
  
    async predictCreditScore(data) {
      // TODO: In production, call your trained ML model API
      // Example:
      // const response = await fetch('YOUR_ML_MODEL_API_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // return await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock ML prediction logic
      const baseScore = 650;
      const ndviBonus = (parseFloat(data.ndvi) - 0.5) * 200;
      const yieldBonus = (parseFloat(data.crop_yield_per_sqm) * 10);
      const defaultPenalty = data.defaulted_loans_count * 50;
      const farmSizeBonus = Math.log(parseFloat(data.farm_size)) * 20;
      
      const creditScore = Math.max(300, Math.min(900, 
        baseScore + ndviBonus + yieldBonus - defaultPenalty + farmSizeBonus
      ));
  
      const interestRate = Math.max(8, Math.min(25, 25 - (creditScore - 300) / 30));
      const loanLimit = (creditScore - 300) * 100 + 50000;
      const loanDuration = creditScore > 700 ? 24 : creditScore > 600 ? 18 : 12;
  
      return {
        credit_score: Math.round(creditScore),
        interest_rate: interestRate.toFixed(2),
        loan_limit: Math.round(loanLimit),
        loan_duration: loanDuration,
        risk_level: creditScore > 700 ? 'Low' : creditScore > 600 ? 'Medium' : 'High'
      };
    },
  
    async submitLoanApplication(data) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        application_id: 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        ...data,
        status: 'pending',
        submission_date: new Date().toISOString()
      };
    }
  };
  
  export default API;
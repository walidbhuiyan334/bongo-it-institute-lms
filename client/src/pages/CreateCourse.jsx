import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Save, UploadCloud, Plus, Trash2, 
  Layout, DollarSign, BookOpen, FileVideo, Image as ImageIcon,
  CheckCircle2, AlertCircle, PlayCircle, ChevronRight,
  Edit2, X, File, Video, Loader2, ListChecks, Target, FileQuestion, Eye
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; 

const CreateCourse = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false); // ✅ নতুন স্টেট

  // --- STATES FOR LESSON MODAL ---
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  
  // Lesson Specific States
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState("video"); 
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [editingModuleId, setEditingModuleId] = useState(null);

  // --- MAIN FORM DATA ---
  const defaultData = {
    title: "", subtitle: "", category: "", level: "Beginner",
    price: "", discount: "", description: "", thumbnail: null,
    learningOutcomes: [""], 
    requirements: [""], 
    modules: [{ id: 1, title: "Introduction", lessons: [] }]
  };

  const [courseData, setCourseData] = useState(defaultData);

  // --- SAFE LOAD DRAFT ---
  useEffect(() => {
    const savedDraft = localStorage.getItem("courseDraft");
    if (savedDraft) {
        try {
            const parsed = JSON.parse(savedDraft);
            setCourseData(prev => ({
                ...prev,
                ...parsed,
                learningOutcomes: parsed.learningOutcomes || [""],
                requirements: parsed.requirements || [""],
                modules: parsed.modules || [{ id: 1, title: "Introduction", lessons: [] }]
            }));
            if (parsed.thumbnail && typeof parsed.thumbnail === 'string') {
               setPreviewImage(parsed.thumbnail);
            }
            toast.success("ড্রাফট লোড করা হয়েছে");
        } catch (error) {
            console.error("Draft load error", error);
            localStorage.removeItem("courseDraft");
        }
    }
  }, []);

  // --- HANDLERS ---
  const handleChange = (e) => setCourseData({ ...courseData, [e.target.name]: e.target.value });

  // ✅ Cloudinary Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Local Preview
    setPreviewImage(URL.createObjectURL(file));
    setIsImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // 2. Upload to Cloudinary via Backend
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        // 3. Set Cloudinary URL
        setCourseData({ ...courseData, thumbnail: data.imageUrl });
        toast.success("ইমেজ আপলোড সম্পন্ন!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setIsImageUploading(false);
    }
  };

  // --- DYNAMIC INPUTS ---
  const handleArrayChange = (key, index, value) => {
    const updatedArray = [...(courseData[key] || [""])];
    updatedArray[index] = value;
    setCourseData({ ...courseData, [key]: updatedArray });
  };

  const addArrayField = (key) => {
    setCourseData({ ...courseData, [key]: [...(courseData[key] || []), ""] });
  };

  const removeArrayField = (key, index) => {
    const updatedArray = courseData[key].filter((_, i) => i !== index);
    setCourseData({ ...courseData, [key]: updatedArray });
  };

  const handleSaveDraft = () => {
      // We save the full object including thumbnail URL (if uploaded)
      localStorage.setItem("courseDraft", JSON.stringify(courseData));
      toast.success("ড্রাফট সেভ করা হয়েছে!");
  };

  const handleNextStep = (nextStep) => {
    if (activeStep === 1) {
        if (!courseData.title) return toast.error("কোর্সের শিরোনাম আবশ্যক");
        if (!courseData.category) return toast.error("ক্যাটাগরি আবশ্যক");
        if (!courseData.description) return toast.error("বিবরণ আবশ্যক");
    }
    
    if (activeStep === 3 && nextStep === 4 && courseData.modules.length === 0) {
      return toast.error("কমপক্ষে একটি মডিউল থাকতে হবে");
    }
    setActiveStep(nextStep);
    window.scrollTo(0, 0);
  };

  // --- CURRICULUM LOGIC ---
  const addModule = () => {
    const newModule = { id: Date.now(), title: `New Section ${courseData.modules.length + 1}`, lessons: [] };
    setCourseData({ ...courseData, modules: [...courseData.modules, newModule] });
    toast.success("নতুন মডিউল যোগ হয়েছে");
  };

  const deleteModule = (id) => {
    const updatedModules = courseData.modules.filter(m => m.id !== id);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const updateModuleTitle = (id, newTitle) => {
    const updatedModules = courseData.modules.map(m => m.id === id ? { ...m, title: newTitle } : m);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // --- LESSON LOGIC ---
  const openAddLessonModal = (moduleId) => {
    setCurrentModuleId(moduleId);
    setLessonTitle("");
    setLessonType("video");
    setIsFreePreview(false);
    setSelectedVideo(null);
    setUploadProgress(0);
    setIsLessonModalOpen(true);
  };

  const handleVideoSelect = (e) => {
      const file = e.target.files[0];
      if(file) {
          if(file.size > 100 * 1024 * 1024) return toast.error("Max size 100MB");
          setSelectedVideo(file);
          setIsUploading(true);
          let progress = 0;
          const interval = setInterval(() => {
              progress += 10;
              setUploadProgress(progress);
              if(progress >= 100) { clearInterval(interval); setIsUploading(false); toast.success("আপলোড সম্পন্ন!"); }
          }, 300);
      }
  };

  const saveLesson = () => {
    if (!lessonTitle.trim()) return toast.error("লেসনের নাম লিখুন");
    const newLesson = { 
        id: Date.now(), title: lessonTitle, type: lessonType, 
        isFreePreview: isFreePreview, videoName: selectedVideo ? selectedVideo.name : null, duration: "10:00"
    };
    const updatedModules = courseData.modules.map(module => {
      if (module.id === currentModuleId) return { ...module, lessons: [...module.lessons, newLesson] };
      return module;
    });
    setCourseData({ ...courseData, modules: updatedModules });
    setIsLessonModalOpen(false);
    toast.success("লেসন যোগ হয়েছে!");
  };

  const deleteLesson = (moduleId, lessonId) => {
    const updatedModules = courseData.modules.map(module => {
      if (module.id === moduleId) return { ...module, lessons: module.lessons.filter(l => l.id !== lessonId) };
      return module;
    });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // --- ✅ FINAL SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👇👇👇 এই ৩টি লাইন নতুন করে যোগ করুন (ডিবাগিং এর জন্য)
    console.log("🔥 SUBMIT BUTTON CLICKED!");
    console.log("📤 Sending Data to Backend:", courseData);
    console.log("🖼️ Thumbnail Value:", courseData.thumbnail);
    // 👆👆👆

    if (!courseData.price) return toast.error("কোর্সের মূল্য আবশ্যক");
    if (!courseData.thumbnail) return toast.error("দয়া করে একটি থাম্বনেইল আপলোড করুন");
    
    setLoading(true);
    try {
      // ✅ এখানে আমরা পুরো courseData পাঠাবো কারণ thumbnail এখন একটি URL String
      const response = await api.post("/courses/create", courseData);
      
      if(response.data.success) {
         toast.success("কোর্সটি রিভিউ-এর জন্য সাবমিট করা হয়েছে!");
         localStorage.removeItem("courseDraft");
         navigate("/teacher/dashboard");
      }
    } catch (err) {
      console.error("Course Create Error:", err);
      const errorMessage = err.response?.data?.message || "সার্ভার এরর!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-['Hind Siliguri'] text-slate-800 pb-20 relative">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/teacher/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition border border-transparent hover:border-gray-200">
              <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 leading-tight">
                 কোর্স তৈরি <span className="hidden sm:inline">করুন</span> 
                 <span className="w-fit text-[10px] sm:text-xs bg-purple-50 text-[#5e17eb] px-2 py-0.5 rounded border border-purple-100 font-medium">Draft</span>
               </h1>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button onClick={handleSaveDraft} className="hidden sm:flex px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition text-xs sm:text-sm hover:border-gray-300">
              সেভ ড্রাফট
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading || isImageUploading} // ইমেজ আপলোড চলাকালীন সাবমিট বন্ধ
              className="px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl bg-[#5e17eb] text-white font-bold hover:bg-[#4a11b8] transition shadow-lg shadow-purple-200 flex items-center gap-2 text-xs sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin"/> : <Save size={16} />}
              <span className="hidden sm:inline">রিভিউ-এর জন্য সাবমিট</span>
              <span className="sm:hidden">সাবমিট</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-3 order-1 lg:order-none">
           <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-6 sticky top-20 sm:top-28 shadow-sm">
              <h3 className="hidden sm:block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Roadmap</h3>
              <div className="flex lg:flex-col gap-2 sm:gap-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide lg:space-y-2">
                 <div className="hidden lg:block absolute left-[19px] top-12 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
                 <StepItem step={1} label="তথ্য" desc="আবশ্যক *" active={activeStep === 1} done={activeStep > 1} onClick={() => handleNextStep(1)} icon={<Layout size={16}/>} />
                 <StepItem step={2} label="মিডিয়া" desc="অপশনাল" active={activeStep === 2} done={activeStep > 2} onClick={() => handleNextStep(2)} icon={<ImageIcon size={16}/>} />
                 <StepItem step={3} label="কারিকুলাম" desc="আবশ্যক *" active={activeStep === 3} done={activeStep > 3} onClick={() => handleNextStep(3)} icon={<BookOpen size={16}/>} />
                 <StepItem step={4} label="প্রাইসিং" desc="আবশ্যক *" active={activeStep === 4} done={activeStep > 4} onClick={() => handleNextStep(4)} icon={<DollarSign size={16}/>} />
              </div>
           </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-9 space-y-6 order-2 lg:order-none">
            
            {/* STEP 1: Basic Info */}
            {activeStep === 1 && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/50"><h2 className="text-lg sm:text-xl font-bold text-gray-900">কোর্সের সাধারণ তথ্য</h2></div>
                <div className="p-5 sm:p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">কোর্সের শিরোনাম <span className="text-red-500">*</span></label>
                        <input type="text" name="title" value={courseData.title} onChange={handleChange} placeholder="যেমন: Complete Python Bootcamp" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 text-sm sm:text-base" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ক্যাটাগরি <span className="text-red-500">*</span></label>
                            <select name="category" value={courseData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 text-sm cursor-pointer">
                                <option value="">সিলেক্ট করুন...</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="App Development">App Development</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">লেভেল</label>
                            <select name="level" value={courseData.level} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 text-sm cursor-pointer">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                  </div>
                  <hr className="border-gray-100"/>
                  
                  <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><ListChecks size={18} className="text-[#5e17eb]"/> কী শিখবে? (Learning Outcomes)</label>
                      {(courseData.learningOutcomes || [""]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => handleArrayChange('learningOutcomes', index, e.target.value)} placeholder="পয়েন্ট লিখুন..." className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                            {courseData.learningOutcomes?.length > 1 && <button onClick={() => removeArrayField('learningOutcomes', index)} className="p-2.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>}
                        </div>
                      ))}
                      <button onClick={() => addArrayField('learningOutcomes')} className="text-xs font-bold text-[#5e17eb] flex items-center gap-1 mt-1 hover:underline"><Plus size={14}/> আরও যোগ করুন</button>
                  </div>

                  <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Target size={18} className="text-[#5e17eb]"/> পূর্বশর্ত (Requirements)</label>
                      {(courseData.requirements || [""]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => handleArrayChange('requirements', index, e.target.value)} placeholder="পয়েন্ট লিখুন..." className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                            {courseData.requirements?.length > 1 && <button onClick={() => removeArrayField('requirements', index)} className="p-2.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>}
                        </div>
                      ))}
                      <button onClick={() => addArrayField('requirements')} className="text-xs font-bold text-[#5e17eb] flex items-center gap-1 mt-1 hover:underline"><Plus size={14}/> আরও যোগ করুন</button>
                  </div>

                  <hr className="border-gray-100"/>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">বিবরণ <span className="text-red-500">*</span></label>
                    <textarea name="description" value={courseData.description} onChange={handleChange} rows="5" placeholder="কোর্স সম্পর্কে বিস্তারিত..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 text-sm"></textarea>
                  </div>
                </div>
                <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button onClick={() => handleNextStep(2)} className="bg-[#5e17eb] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition">সামনে যান</button>
                </div>
              </div>
            )}

            {/* STEP 2: Media (Image Upload) */}
            {activeStep === 2 && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                  <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/50"><h2 className="text-lg sm:text-xl font-bold text-gray-900">কোর্স মিডিয়া</h2></div>
                  <div className="p-5 sm:p-8">
                    <label className="text-sm font-bold text-gray-700 mb-3 block">কোর্স থাম্বনেইল</label>
                    
                    {/* ✅ UPDATED IMAGE UPLOAD BOX */}
                    <div className={`border-2 border-dashed ${previewImage ? 'border-[#5e17eb]' : 'border-gray-300'} rounded-2xl h-48 sm:h-64 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden group hover:border-[#5e17eb] transition-colors`}>
                        <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
                        
                        {isImageUploading ? (
                           <div className="flex flex-col items-center">
                              <Loader2 className="animate-spin text-[#5e17eb] mb-2" size={30} />
                              <p className="text-sm font-bold text-gray-500">আপলোড হচ্ছে...</p>
                           </div>
                        ) : previewImage ? (
                           <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                           <div className="text-center p-4">
                              <ImageIcon className="mx-auto text-[#5e17eb] mb-3"/>
                              <p className="text-gray-900 font-bold text-sm sm:text-base">ছবি আপলোড করুন</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                           </div>
                        )}
                    </div>

                  </div>
                  <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                    <button onClick={() => handleNextStep(1)} className="text-gray-500 font-bold text-sm px-4">পেছনে যান</button>
                    <button onClick={() => handleNextStep(3)} className="bg-[#5e17eb] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition">সামনে যান</button>
                  </div>
              </div>
            )}

            {/* STEP 3: Curriculum */}
            {activeStep === 3 && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                  <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div><h2 className="text-lg sm:text-xl font-bold text-gray-900">কারিকুলাম</h2><p className="text-xs sm:text-sm text-gray-500 mt-0.5">মডিউল এবং লেসন সাজান</p></div>
                    <button onClick={addModule} className="w-full sm:w-auto bg-[#5e17eb]/10 text-[#5e17eb] px-4 py-2 rounded-lg text-sm font-bold border border-[#5e17eb]/20"><Plus size={16} className="inline mr-1"/> নতুন মডিউল</button>
                  </div>
                  <div className="p-4 sm:p-8 bg-gray-50/30 min-h-[300px]">
                    <div className="space-y-4">
                        {(courseData.modules || []).map((module) => (
                          <div key={module.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                              <div className="p-3 sm:p-4 bg-gray-50 border-b flex justify-between items-center">
                                  <div className="flex items-center gap-3 flex-1">
                                      {editingModuleId === module.id ? (
                                        <input autoFocus type="text" defaultValue={module.title} onBlur={(e) => { updateModuleTitle(module.id, e.target.value); setEditingModuleId(null); }} className="font-bold text-sm text-gray-800 border px-2 py-1 rounded w-full max-w-xs" />
                                      ) : (
                                        <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2"><span className="truncate">{module.title}</span><button onClick={() => setEditingModuleId(module.id)} className="text-gray-400 hover:text-[#5e17eb]"><Edit2 size={12} /></button></h4>
                                      )}
                                  </div>
                                  <button onClick={() => deleteModule(module.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><Trash2 size={16}/></button>
                              </div>
                              <div className="p-3 sm:p-4 space-y-2">
                                  {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex justify-between p-3 bg-white border rounded-lg hover:shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {lesson.type === 'video' ? <Video size={16} className="text-[#5e17eb]"/> : <FileQuestion size={16} className="text-orange-500"/>}
                                            <div className="min-w-0">
                                              <div className="flex items-center gap-2"><span className="text-sm font-medium text-gray-700 truncate">{lesson.title}</span>{lesson.isFreePreview && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded">Free</span>}</div>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteLesson(module.id, lesson.id)} className="text-red-500"><X size={14}/></button>
                                    </div>
                                  ))}
                                  <button onClick={() => openAddLessonModal(module.id)} className="w-full py-2 border border-dashed rounded-lg text-xs font-bold text-[#5e17eb] hover:bg-[#5e17eb]/5 flex justify-center gap-1 mt-2"><Plus size={14}/> কন্টেন্ট যোগ করুন</button>
                              </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                    <button onClick={() => setActiveStep(2)} className="text-gray-500 font-bold text-sm px-4">পেছনে যান</button>
                    <button onClick={() => handleNextStep(4)} className="bg-[#5e17eb] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition">সামনে যান</button>
                  </div>
              </div>
            )}

            {/* STEP 4: Pricing */}
            {activeStep === 4 && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                  <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/50"><h2 className="text-lg sm:text-xl font-bold text-gray-900">কোর্সের মূল্য</h2></div>
                  <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-700">কোর্স প্রাইস (৳) <span className="text-red-500">*</span></label>
                          <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">৳</span>
                              <input type="number" name="price" value={courseData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold" placeholder="0" />
                          </div>
                        </div>
                    </div>
                    <div className="bg-[#1e1b4b] rounded-2xl p-5 text-white shadow-xl flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-indigo-200 uppercase mb-2">সম্ভাব্য আয়</h4>
                        <div className="flex items-end gap-2 mb-2"><span className="text-3xl font-bold">৳ {courseData.price ? Math.round(courseData.price * 0.8) : 0}</span><span className="text-xs text-indigo-300">/ sale</span></div>
                        <p className="text-xs text-indigo-400">প্লাটফর্ম ফি ২০% বাদ দেওয়ার পর।</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                    <button onClick={() => setActiveStep(3)} className="text-gray-500 font-bold text-sm px-4">পেছনে যান</button>
                    <button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-200/50 transition flex items-center gap-2">
                       <CheckCircle2 size={18}/> রিভিউ-এর জন্য সাবমিট করুন
                    </button>
                  </div>
              </div>
            )}
        </div>
      </div>

      {/* MODAL */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold">নতুন কন্টেন্ট</h3><button onClick={() => setIsLessonModalOpen(false)}><X size={20}/></button></div>
              <div className="space-y-5">
                 <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setLessonType("video")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${lessonType === "video" ? "bg-white shadow text-[#5e17eb]" : "text-gray-500"}`}>ভিডিও</button>
                    <button onClick={() => setLessonType("quiz")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${lessonType === "quiz" ? "bg-white shadow text-orange-500" : "text-gray-500"}`}>কুইজ</button>
                 </div>
                 <div><label className="text-sm font-bold block mb-2">শিরোনাম *</label><input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-sm" autoFocus /></div>
                 {lessonType === 'video' && (
                    <>
                       <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer relative"><input type="file" accept="video/*" onChange={handleVideoSelect} className="absolute inset-0 opacity-0" /><UploadCloud className="mx-auto mb-2 text-[#5e17eb]"/><p className="text-sm font-bold">{selectedVideo ? selectedVideo.name : "ভিডিও সিলেক্ট করুন"}</p></div>
                       <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl cursor-pointer" onClick={() => setIsFreePreview(!isFreePreview)}>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${isFreePreview ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}>{isFreePreview && <CheckCircle2 size={14} className="text-white"/>}</div>
                          <div><p className="text-sm font-bold">ফ্রি প্রিভিউ</p></div>
                       </div>
                    </>
                 )}
              </div>
              <div className="flex gap-3 mt-6">
                 <button onClick={() => setIsLessonModalOpen(false)} className="flex-1 py-2.5 border rounded-xl font-bold text-sm">বাতিল</button>
                 <button onClick={saveLesson} disabled={isUploading || !lessonTitle} className="flex-1 py-2.5 bg-[#5e17eb] text-white rounded-xl font-bold text-sm disabled:opacity-50">সেভ করুন</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const StepItem = ({ step, label, desc, active, done, onClick, icon }) => (
  <button onClick={onClick} className={`flex-shrink-0 w-32 sm:w-full flex sm:flex-row flex-col items-center gap-3 p-3 rounded-xl border text-center sm:text-left ${active ? "bg-[#5e17eb] text-white border-[#5e17eb]" : done ? "bg-white text-gray-800 border-transparent" : "text-gray-400 border-transparent"}`}>
     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? "bg-white/20" : done ? "bg-green-100 text-green-600" : "bg-gray-100"}`}>{done ? <CheckCircle2 size={16}/> : icon}</div>
     <div className="min-w-0"><h4 className={`text-xs font-bold truncate ${active ? "text-white" : "text-gray-800"}`}>{label}</h4><p className={`hidden sm:block text-[10px] ${active ? "text-purple-200" : "text-gray-500"}`}>{desc}</p></div>
  </button>
);

export default CreateCourse;
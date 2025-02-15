import React, { useState } from "react";
import {
  User,
  Users,
  Phone,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  School,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnterImg from "../../assets/519e095758e3a68e9900795fa324e800--study-notes-study-hard.jpg";

export const StudentForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    name: "",
    middleNames: "",
    phoneNumber: "",
    birthDate: "",
    state: "",
    districtCity: "",
    courseNumber: "",
    universityName: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya kiritilishi shart";
    } else if (!/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ\s']+$/.test(formData.lastName)) {
      newErrors.lastName = "Familiya faqat harflardan iborat bo'lishi kerak";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Ism kiritilishi shart";
    } else if (!/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ\s']+$/.test(formData.name)) {
      newErrors.name = "Ism faqat harflardan iborat bo'lishi kerak";
    }

    if (!formData.middleNames.trim()) {
      newErrors.middleNames = "Otasining ismi kiritilishi shart";
    } else if (!/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ\s']+$/.test(formData.middleNames)) {
      newErrors.middleNames =
        "Otasining ismi faqat harflardan iborat bo'lishi kerak";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon raqami kiritilishi shart";
    } else if (!/^\+998[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Noto'g'ri telefon raqami formati. Masalan: +998901234567";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Tug'ilgan sana kiritilishi shart";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Viloyat kiritilishi shart";
    }

    if (!formData.districtCity.trim()) {
      newErrors.districtCity = "Tuman/Shahar kiritilishi shart";
    }

    if (!formData.courseNumber) {
      newErrors.courseNumber = "Kurs raqami kiritilishi shart";
    } else if (formData.courseNumber < 1 || formData.courseNumber > 6) {
      newErrors.courseNumber = "Kurs raqami 1 dan 6 gacha bo'lishi kerak";
    }

    if (!formData.universityName.trim()) {
      newErrors.universityName = "Universitet nomi kiritilishi shart";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      localStorage.setItem("user_data", JSON.stringify(formData));
      localStorage.setItem("exam_access", true);
      navigate("/exams");
    }
  };

  const getInputClassName = (fieldName) => {
    return `w-full pl-11 pr-10 py-2.5 border ${
      errors[fieldName]
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
    } rounded-lg transition duration-200`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-indigo-100 relative hidden md:block">
        <img
          src={EnterImg}
          alt="Students studying"
          className="absolute inset-0 w-[100%] h-[100%] object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-20"></div>
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
             Ro'yxatdan o'tish
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Familiya
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={getInputClassName("lastName")}
                  />
                  {errors.lastName && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ism
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={getInputClassName("name")}
                  />
                  {errors.name && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Otasining ismi
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="middleNames"
                    value={formData.middleNames}
                    onChange={handleChange}
                    className={getInputClassName("middleNames")}
                  />
                  {errors.middleNames && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon raqami
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+998901234567"
                    className={getInputClassName("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tug'ilgan sana
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={getInputClassName("birthDate")}
                  />
                  {errors.birthDate && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Viloyat
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={getInputClassName("state")}
                  />
                  {errors.state && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tuman/Shahar
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="districtCity"
                    value={formData.districtCity}
                    onChange={handleChange}
                    className={getInputClassName("districtCity")}
                  />
                  {errors.districtCity && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kurs raqami
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="courseNumber"
                    value={formData.courseNumber}
                    onChange={handleChange}
                    min="1"
                    max="6"
                    className={getInputClassName("courseNumber")}
                  />
                  {errors.courseNumber && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Universitet nomi
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    className={getInputClassName("universityName")}
                  />
                  {errors.universityName && (
                    <>
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Boshlash</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

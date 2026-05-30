import { useEffect, useState } from "react";
import { Alert, Container, Table, Badge } from "react-bootstrap";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Apis";

const Drug = () => {
    const [categories, setCategories] = useState([]);
    const [drugs, setDrugs] = useState([]); 
    const [selectedCat, setSelectedCat] = useState(null); 
    const [kw, setKw] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [loadingDrugs, setLoadingDrugs] = useState(false); 

    const [isEditing, setIsEditing] = useState(false); 
    const [imageFile, setImageFile] = useState(null); 
    const [formData, setFormData] = useState({
        drugId: "", name: "", unit: "Viên", price: "", quantity: "", categoryId: ""
    });

    const loadCategories = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['categories']);
            let data = Array.isArray(res.data) ? res.data : res.data?.data || [];
            setCategories(data);
            if (data.length > 0 && !formData.categoryId) {
                setFormData(prev => ({ ...prev, categoryId: data[0].categoryId }));
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const loadDrugs = async (searchKw = "", catId = null) => {
        try {
            setLoadingDrugs(true);
            let url = endpoints['drugs'];
            let queryParams = [];

            if (searchKw) queryParams.push(`kw=${encodeURIComponent(searchKw)}`);
            if (catId) queryParams.push(`categoryId=${catId}`);
            if (queryParams.length > 0) url = `${url}?${queryParams.join("&")}`;

            let res = await authApis().get(url);
            setDrugs(Array.isArray(res.data) ? res.data : res.data?.data || res.data?.drugs || []);
        } catch (ex) {
            console.error(ex);
            setDrugs([]);
        } finally {
            setLoadingDrugs(false);
        }
    };

    useEffect(() => { loadCategories(); }, []);
    useEffect(() => { loadDrugs(kw, selectedCat); }, [selectedCat]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadDrugs(kw.trim(), selectedCat);
    };

    const handleDelete = async (drugId) => {
        if (window.confirm(`Trinh có chắc muốn xóa thuốc mã #${drugId} không?`)) {
            try {
                setLoadingDrugs(true);
                await authApis().delete(`${endpoints['drugs']}/${drugId}`);
                alert("Đã xóa thuốc thành công!");
                loadDrugs(kw, selectedCat);
            } catch (ex) {
                console.error(ex);
                alert("Không thể xóa sản phẩm thuốc này.");
            } finally {
                setLoadingDrugs(false);
            }
        }
    };

    const handleSelectEdit = (drug) => {
        setIsEditing(true);
        setFormData({
            drugId: drug.drugId,
            name: drug.name,
            unit: drug.unit || "Viên",
            price: drug.price,
            quantity: drug.quantity,
            categoryId: drug.categoryId || (categories[0]?.categoryId || "")
        });
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleResetForm = () => {
        setIsEditing(false);
        setFormData({ drugId: "", name: "", unit: "Viên", price: "", quantity: "", categoryId: categories[0]?.categoryId || "" });
        setImageFile(null);
    };

    const handleSaveDrug = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.quantity) {
            alert("Trinh nhớ điền đầy đủ thông tin thuốc nhen!");
            return;
        }

        try {
            setLoadingDrugs(true);
            const formToSend = new FormData();
            formToSend.append("name", formData.name);
            formToSend.append("unit", formData.unit);
            formToSend.append("price", formData.price);
            formToSend.append("quantity", formData.quantity);
            formToSend.append("categoryId", formData.categoryId);
            if (imageFile) formToSend.append("file", imageFile);

            let url = endpoints['drugs'];
            if (isEditing) {
                await authApis().put(`${url}/${formData.drugId}`, formToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert("Cập nhật thông tin thuốc thành công!");
            } else {
                await authApis().post(url, formToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert("Thêm thuốc mới thành công!");
            }
            handleResetForm();
            loadDrugs(kw, selectedCat);
        } catch (ex) {
            console.error(ex);
            alert("Thao tác thất bại. Vui lòng kiểm tra dữ liệu");
        } finally {
            setLoadingDrugs(false);
        }
    };

    return (
        <div className="main-content">
            <Container>
                
                <div className="section-box text-center">
                    <h2>Quản Lý Kho Dược Phẩm (Admin)</h2>
                </div>

                <div className="register-pastel-box" style={{ maxWidth: "100%", marginBottom: "35px" }}>
                    <div className="register-head-box">
                        <span className="register-label-chip">
                            {isEditing ? "✏️ CHẾ ĐỘ CHỈNH SỬA THUỐC" : "➕ CHẾ ĐỘ NHẬP KHO MỚI"}
                        </span>
                        <h2>{isEditing ? `Cập nhật dữ liệu mã thuốc #${formData.drugId}` : "Nhập Dược Phẩm Mới Vào Kho"}</h2>
                    </div>

                    <form onSubmit={handleSaveDrug}>
                        <div className="register-grid-2">
                            <div className="register-field-box">
                                <label>Tên sản phẩm thuốc:</label>
                                <input type="text" placeholder="Ví dụ: Paracetamol 500mg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="register-field-box">
                                <label>Thuộc danh mục kho:</label>
                                <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                                    {categories.map(cat => (
                                        <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="register-grid-2">
                            <div className="register-field-box">
                                <label>Đơn vị tính:</label>
                                <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}>
                                    <option value="Viên">Viên</option>
                                    <option value="Vỉ">Vỉ</option>
                                    <option value="Hộp">Hộp</option>
                                    <option value="Chai/Lọ">Chai/Lọ</option>
                                    <option value="Ống">Ống</option>
                                </select>
                            </div>
                            <div className="register-field-box">
                                <label>Đơn giá xuất kho (VNĐ):</label>
                                <input type="number" placeholder="Ví dụ: 5000" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                            </div>
                        </div>

                        <div className="register-grid-2">
                            <div className="register-field-box">
                                <label>Số lượng nhập tồn kho:</label>
                                <input type="number" placeholder="Ví dụ: 100" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                            </div>
                            <div className="register-field-box">
                                <label>Hình ảnh trực quan của thuốc:</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            </div>
                        </div>

                        <div className="register-grid-2" style={{ marginTop: "15px" }}>
                            <button type="submit" className="register-big-btn" style={{ marginTop: 0 }}>
                                {isEditing ? "💾 Cập nhật thông tin" : "💾 Xác nhận nhập kho"}
                            </button>
                            {isEditing ? (
                                <button type="button" className="btn-outline-shared" style={{ borderRadius: "14px", height: "45px" }} onClick={handleResetForm}>
                                    ❌ Hủy sửa
                                </button>
                            ) : <div></div>}
                        </div>
                    </form>
                </div>

                <div className="drug-toolbar-wrapper">
                    <div className="drug-scroll-container">
                        <span className="drug-toolbar-label">📁 Phân loại kho:</span>
                        <button 
                            className={`btn-filter-item ${selectedCat === null ? "btn-main-shared" : "btn-outline-shared"}`} 
                            onClick={() => setSelectedCat(null)}
                        >
                            💼 Tất cả kho thuốc
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat.categoryId} 
                                className={`btn-filter-item ${selectedCat === cat.categoryId ? "btn-main-shared" : "btn-outline-shared"}`} 
                                onClick={() => setSelectedCat(cat.categoryId)}
                            >
                                📁 {cat.categoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="search-container-shared">
                    <form onSubmit={handleSearch} className="search-form-shared">
                        <input type="text" className="search-input-shared" placeholder="Nhập tên thuốc cần tra cứu..." value={kw} onChange={(e) => setKw(e.target.value)} />
                        <button type="submit" className="btn-main-shared" style={{ width: "auto", whiteSpace: "nowrap" }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "6px" }}></i> Tìm kiếm
                        </button>
                    </form>
                </div>

                <div className="drug-title-status-bar">
                    <h4 style={{ fontWeight: "bold", color: "var(--blue-dark)", margin: 0 }}>
                        {selectedCat ? `📦 Danh mục: ${categories.find(c => c.categoryId === selectedCat)?.categoryName}` : "📦 Toàn bộ dược phẩm trong kho hệ thống"}
                    </h4>
                    {drugs.length > 0 && (
                        <Badge bg="secondary" style={{ backgroundColor: "var(--muted)", padding: "6px 12px", fontSize: "13px", borderRadius: "8px" }}>
                            Hiển thị: {drugs.length} loại
                        </Badge>
                    )}
                </div>

                {loading || loadingDrugs ? <div className="text-center" style={{ margin: "25px 0" }}><MySpinner /></div> : null}

                {!(loading || loadingDrugs) && (
                    <div className="feature-card" style={{ padding: "20px", backgroundColor: "white", borderRadius: "20px" }}>
                        {drugs.length === 0 ? (
                            <Alert variant="info" className="text-center" style={{ margin: 0 }}>
                                💊 Hiện không tìm thấy sản phẩm thuốc nào trong kho này!
                            </Alert>
                        ) : (
                            <Table responsive hover striped style={{ verticalAlign: "middle", margin: 0 }}>
                                <thead>
                                    <tr style={{ color: "var(--blue-dark)" }}>
                                        <th>Mã số</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên thuốc</th>
                                        <th>Đơn vị</th>
                                        <th>Đơn giá</th>
                                        <th>Tồn kho</th>
                                        <th className="text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drugs.map(d => (
                                        <tr key={d.drugId}>
                                            <td><strong>#{d.drugId}</strong></td>
                                            <td>
                                                <img 
                                                    src={d.image || d.avatar || "https://placehold.co/100x100?text=Medicine"} 
                                                    alt={d.name}
                                                    className="drug-table-img"
                                                    onError={(e) => { e.target.src = "https://placehold.co/100x100?text=No+Image"; }}
                                                />
                                            </td>
                                            <td style={{ fontWeight: "bold" }}>{d.name}</td>
                                            <td><Badge bg="light" text="dark" style={{ border: "1px solid var(--border)", fontSize: "12px" }}>{d.unit || "Viên"}</Badge></td>
                                            <td style={{ fontWeight: "600", color: "var(--blue-dark)" }}>{Number(d.price).toLocaleString('vi-VN')} đ</td>
                                            <td>
                                                {d.quantity <= 15 ? (
                                                    <Badge bg="danger" style={{ fontSize: "12px", padding: "6px 10px" }}>Còn {d.quantity} (Sắp hết!)</Badge>
                                                ) : (
                                                    <Badge bg="success" style={{ fontSize: "12px", padding: "6px 10px" }}>{d.quantity}</Badge>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button className="btn-main-shared" style={{ height: "32px", padding: "0 14px", fontSize: "12px", marginRight: "8px", width: "auto" }} onClick={() => handleSelectEdit(d)}>
                                                    <i className="fa-solid fa-pen-to-square"></i> Sửa
                                                </button>
                                                <button className="btn-outline-shared" style={{ height: "32px", padding: "0 14px", fontSize: "12px", width: "auto", borderColor: "#d43e3e", color: "#d43e3e" }} onClick={() => handleDelete(d.drugId)}>
                                                    <i className="fa-solid fa-trash-can"></i> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                )}

            </Container>
        </div>
    );
};

export default Drug;
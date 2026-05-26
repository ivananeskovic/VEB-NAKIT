import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectIsAdminUser, selectUserInfo } from '../slices/authSlice';
import { addAdminProduct, removeAdminProduct, updateAdminProduct } from '../slices/productSlice';

const adminProductCategories = ['Mindjuse', 'Ogrlice', 'Narukvice', 'Setovi'];

const emptyAdminProductForm = {
  name: '',
  category: adminProductCategories[0],
  price: '',
  countInStock: '',
  image: '',
  description: '',
};

const adminProductFields = [
  { name: 'name', placeholder: 'Naziv proizvoda', type: 'text' },
  { name: 'price', placeholder: 'Cena', type: 'number' },
  { name: 'countInStock', placeholder: 'Kolicina', type: 'number' },
  { name: 'image', placeholder: 'URL slike (nije obavezno)', type: 'text' },
];

const isProductFormValid = (product) =>
  Boolean(product.name && product.price && product.countInStock && product.description);

const createProductFormData = (product) => ({
  name: product.name,
  category: product.category,
  price: product.price.toString(),
  countInStock: product.countInStock.toString(),
  image: product.image,
  description: product.description,
});

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isAdminUser = useSelector(selectIsAdminUser);
  const { products } = useSelector((state) => state.products);
  const [formData, setFormData] = useState(emptyAdminProductForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const canManageProducts = Boolean(userInfo && isAdminUser);
  const isEditing = Boolean(editingProductId);
  const setField = (name, value) => setFormData({ ...formData, [name]: value });

  const resetForm = () => {
    setFormData(emptyAdminProductForm);
    setEditingProductId(null);
  };

  const startEditing = (product) => {
    setFormData(createProductFormData(product));
    setEditingProductId(product._id);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!canManageProducts) {
      return;
    }

    if (!isProductFormValid(formData)) {
      toast.error('Popunite naziv, cenu, kolicinu i opis proizvoda.');
      return;
    }

    if (isEditing) {
      dispatch(updateAdminProduct({ ...formData, _id: editingProductId }));
      toast.success('Proizvod je izmenjen.');
    } else {
      dispatch(addAdminProduct(formData));
      toast.success('Proizvod je dodat.');
    }

    resetForm();
  };

  const deleteHandler = (productId) => {
    if (!canManageProducts) {
      return;
    }

    dispatch(removeAdminProduct(productId));
    toast.info('Proizvod je obrisan.');
  };

  if (!canManageProducts) {
    return (
      <section className="panel-section">
        <h2>Admin panel</h2>
        <p className="empty-state">Nemate dozvolu za pristup admin panelu.</p>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="screen-heading">
        <p className="eyebrow">Administrator</p>
        <h2>Lista proizvoda</h2>
      </div>

      <div className="admin-layout">
        <Form className="admin-form" onSubmit={submitHandler}>
          {adminProductFields.map(({ name, placeholder, type }) => (
            <Form.Control
              key={name}
              value={formData[name]}
              onChange={(e) => setField(name, e.target.value)}
              placeholder={placeholder}
              type={type}
            />
          ))}
          <Form.Select
            value={formData.category}
            onChange={(e) => setField('category', e.target.value)}
          >
            {adminProductCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Select>
          <Form.Control
            as="textarea"
            value={formData.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Opis"
          />
          <Button className="primary-button" type="submit">
            {isEditing ? 'Sacuvaj izmene' : 'Dodaj proizvod'}
          </Button>
          {isEditing && (
            <Button className="secondary-button admin-cancel-button" type="button" onClick={resetForm}>
              Odustani
            </Button>
          )}
        </Form>

        <ListGroup className="admin-list" as="ul" variant="flush">
          {products.map((product) => (
            <ListGroup.Item as="li" key={product._id}>
              <span>
                {product.name}
                <small>{product.category}</small>
              </span>
              <div className="admin-list-actions">
                <Button type="button" onClick={() => startEditing(product)}>
                  Izmeni
                </Button>
                <Button type="button" onClick={() => deleteHandler(product._id)}>
                  Ukloni
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </section>
  );
};

export default ProductListScreen;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  productId = '0';
  image: string;
  product: Product = {};
  messages = [
    {
      user: 'Mario Lopez',
      createdAt: new Date('20223-12-2 14:01').getTime(),
      message: ' Hola !',
    },
    {
      user: 'Mario Lopez',
      createdAt: new Date('2023-12-2 14:05').getTime(),
      message: ' Quisiera información de producto.',
    },
    {
      user: 'Simon Perez',
      createdAt: new Date('2023-12-2 14:10').getTime(),
      message:
        'Un gusto saludarte, claro que si! que es lo que más te interesa del producto.',
    },
  ];

  currentUser = 'Simon Perez';
  newMessage = '';
  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.productId = this.router.snapshot.paramMap.get('proId');
    console.log(this.productId);
    this.productsService.getProductId(this.productId).subscribe((data) => {
      console.log(data);

      this.product = data;
      this.image = this.product.images[0];
    });
  }

  sendMessage() {
    if (this.newMessage !== '') {
      this.messages.push({
        user: 'Simon Perez',
        createdAt: new Date().getTime(),
        message: this.newMessage,
      });

      this.newMessage = '';
    }
  }

  ngOnInit() {}
}

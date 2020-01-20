import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import {FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  choices:string[]=["first","last","handle"]
   reactiveForm:FormGroup;
   selectedArray:string[];
   value=false;
  constructor(private modalService: NgbModal,private fb:FormBuilder) { }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  selected(){
    this.selectedArray=[]
    this.choices2.controls.forEach((item,index)=>{
      if(item.value){
        this.selectedArray.push(this.choices[index])
      }
    })
    console.log(this.selectedArray)
    this.selectedArray.forEach((item)=>{
      if(item=="first")
      {
        this.value=true
      }
      else
      {
        this.value=false
      }
      
    })
    console.log(this.value)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addchoicescontrol(){
    const arr=this.choices.map(element=>{
      return this.fb.control(false)
    })
    return this.fb.array(arr)
  }
  
  get choices2(){
    return <FormArray> this.reactiveForm.get('choices2')
  }
  ngOnInit() {
    this.reactiveForm=this.fb.group({
      choices2:this.addchoicescontrol()
    })
      
    
  }

}

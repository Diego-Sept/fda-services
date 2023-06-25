import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetRequestDto } from './dto/budget-request.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() budgetRequestDto: BudgetRequestDto) {
    return this.budgetsService.create(budgetRequestDto);
  }

  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() budgetRequestDto: BudgetRequestDto) {
    return this.budgetsService.update(+id, budgetRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(+id);
  }
}

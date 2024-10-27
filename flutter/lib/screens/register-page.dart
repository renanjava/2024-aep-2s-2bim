// ignore_for_file: file_names
import 'package:app_aep/widgets/custom-page.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomPage(screenText: 'Tela de Registro', emailField: TextEditingController());
  }
}
